import exportOne from "@/assets/alibaba_export_1789650199616.csv?raw";
import exportTwo from "@/assets/alibaba_export_1789650256829.csv?raw";
import exportThree from "@/assets/alibaba_export_1789650300144.csv?raw";
import exportFour from "@/assets/alibaba_export_1789650338709.csv?raw";
import exportFive from "@/assets/alibaba_export_1789650374209.csv?raw";
import exportSix from "@/alibaba_export_1789654249532.csv?raw";
import exportSeven from "@/alibaba_export_1789654303249.csv?raw";
import exportEight from "@/alibaba_export_1789654320692.csv?raw";
import exportNine from "@/alibaba_export_1789654419335.csv?raw";
import exportTen from "@/alibaba_export_1789654500614.csv?raw";
import exportEleven from "@/alibaba_export_1789654521283.csv?raw";
import exportTwelve from "@/alibaba_export_1789654595686.csv?raw";
import exportThirteen from "@/alibaba_export_1789654632295.csv?raw";
import exportFourteen from "@/alibaba_export_1789654666644.csv?raw";
import exportFifteen from "@/alibaba_export_1789654690202.csv?raw";
import exportSixteen from "@/alibaba_export_1789654772486.csv?raw";
import exportSeventeen from "@/alibaba_export_1789654801866.csv?raw";
import exportEighteen from "@/alibaba_export_1789654831830.csv?raw";
import exportNineteen from "@/alibaba_export_1789654895386.csv?raw";
import exportTwenty from "@/alibaba_export_1789654970842.csv?raw";
import exportTwentyOne from "@/alibaba_export_1789655135948.csv?raw";
import exportTwentyTwo from "@/alibaba_export_1789655156877.csv?raw";
import exportTwentyThree from "@/alibaba_export_1789655228991.csv?raw";
import exportTwentyFour from "@/alibaba_export_1789655268608.csv?raw";
import exportTwentyFive from "@/alibaba_export_1789655432779.csv?raw";
import exportTwentySix from "@/alibaba_export_1789655444402.csv?raw";
import type { Vehicle } from "@/lib/inventory";

type AlibabaRow = {
  title: string;
  price: string;
  moq: string;
  rating: string;
  reviews: string;
  sold: string;
  supplier: string;
  isVerified: string;
  imageUrl: string;
  productUrl: string;
  supplierYears: string;
  supplierCountry: string;
};

const csvFiles = [
  exportOne,
  exportTwo,
  exportThree,
  exportFour,
  exportFive,
  exportSix,
  exportSeven,
  exportEight,
  exportNine,
  exportTen,
  exportEleven,
  exportTwelve,
  exportThirteen,
  exportFourteen,
  exportFifteen,
  exportSixteen,
  exportSeventeen,
  exportEighteen,
  exportNineteen,
  exportTwenty,
  exportTwentyOne,
  exportTwentyTwo,
  exportTwentyThree,
  exportTwentyFour,
  exportTwentyFive,
  exportTwentySix,
];
const vehicleWords =
  /\b(suv|sedan|saloon|hatchback|coupe|convertible|pickup|pick-up|truck|van|mpv|automobile|vehicle|car|ev|electric|hybrid|limousine|supercar|sports car)\b/i;
const nonVehicleWords =
  /\b(tire|tires|tyre|tyres|wheel|wheels|rim|rims|brake|engine part|piston|filter|camper|battery|accessor|door|bumper|light|headlight|headlights|projector|lens|motorcycle|bike|tent|roof top|fender|caravan)\b/i;
const excludedVehicleTitles =
  /\b(for for limited 2\.5l gasoline suv|2026 dongfeng t5 evo premium sedan suv automatic turbo)\b/i;

function parseCsv(csv: string): AlibabaRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];
    const next = csv[index + 1];
    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) rows.push([...row, field]);
  const headers = rows.shift() ?? [];
  return rows.map(
    (values) =>
      Object.fromEntries(
        headers.map((header, index) => [header, values[index] ?? ""]),
      ) as AlibabaRow,
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
}

function firstMatch(value: string, expression: RegExp, fallback: string) {
  return value.match(expression)?.[1] ?? fallback;
}

function toVehicle(row: AlibabaRow, index: number, category: "SUV" | "Sedan" | "Truck"): Vehicle {
  const title = row.title.replace(/\s+/g, " ").trim();
  const year = Number(title.match(/\b(20\d{2})\b/)?.[1] ?? 2024);
  const slug = `awa-${category.toLowerCase()}-${slugify(title)}-${index}`;
  const fuel = /electric|\bev\b|new energy/i.test(title)
    ? "Electric"
    : /hybrid/i.test(title)
      ? "Hybrid"
      : /diesel/i.test(title)
        ? "Diesel"
        : "Petrol";
  const condition = /used|second hand|pre-owned|refurbished/i.test(title) ? "Pre-owned" : "New";
  const image = `/alibaba-cars/${slug}.jpg`;

  return {
    slug,
    brand: firstMatch(
      title,
      /\b(Toyota|Lexus|Mercedes(?:-Benz)?|BMW|BYD|MG|AION|Dongfeng|Hyundai|Kia|Honda|Nissan|Ford|Volkswagen|Audi|Tesla|Range Rover|Land Rover|Geely|Changan|Chery|Jetour|GAC|Forthing)\b/i,
      "AWA selection",
    ),
    model: title.slice(0, 52),
    year,
    condition,
    fuel,
    transmission: /automatic|\bat\b|dct|cvt/i.test(title) ? "Automatic" : "On request",
    price: row.price || "Request current price",
    mileage: /low mileage/i.test(title) ? "Low mileage" : "On request",
    engine: firstMatch(title, /\b(\d(?:\.\d)?L(?:\s?\w+)?)\b/i, "On request"),
    color: firstMatch(
      title,
      /\b(black|white|silver|grey|gray|blue|red|green|gold|yellow)\b/i,
      "As shown",
    ),
    availability: "Available for inquiry",
    image,
    images: [image],
    description: `${category} vehicle available through AWA AUTO MALL. Confirm final specification, condition, price, shipping, and availability with our team before purchase.`,
    category,
  };
}

const importedRows = csvFiles
  .flatMap(parseCsv)
  .filter(
    (row) =>
      vehicleWords.test(row.title) &&
      !nonVehicleWords.test(row.title) &&
      !excludedVehicleTitles.test(row.title),
  )
  .filter((row, index, rows) => {
    const productLink = row.productUrl.trim().toLowerCase();
    const imageLink = row.imageUrl.trim().toLowerCase();
    const title = row.title.replace(/\s+/g, " ").trim().toLowerCase();
    return (
      rows.findIndex((candidate) => {
        const candidateProductLink = candidate.productUrl.trim().toLowerCase();
        const candidateImageLink = candidate.imageUrl.trim().toLowerCase();
        const candidateTitle = candidate.title.replace(/\s+/g, " ").trim().toLowerCase();
        return (
          (productLink && candidateProductLink === productLink) ||
          (imageLink && candidateImageLink === imageLink) ||
          (!productLink && !imageLink && title && candidateTitle === title)
        );
      }) === index
    );
  });
const importedSuvs = importedRows
  .filter((row) => /\b(suv|4x4|sport utility|crossover)\b/i.test(row.title))
  .slice(0, 50);
const importedSedans = importedRows
  .filter((row) => /\b(sedan|saloon)\b/i.test(row.title))
  .slice(0, 50);
const importedTrucks = importedRows
  .filter((row) => !/\b(suv|4x4|sport utility|crossover|sedan|saloon)\b/i.test(row.title))
  .slice(0, 100);

export const importedVehicles: Vehicle[] = [
  ...importedSuvs.map((row, index) => toVehicle(row, index, "SUV")),
  ...importedSedans.map((row, index) => toVehicle(row, index, "Sedan")),
  ...importedTrucks.map((row, index) => toVehicle(row, index, "Truck")),
];
