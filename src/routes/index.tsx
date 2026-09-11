import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
 head:()=>({meta:[{title:"AWA AUTO MALL | Cars & Spare Parts from China"},{name:"description",content:"Source quality cars and automotive spare parts globally with AWA AUTO MALL in Guangzhou, China."},{property:"og:title",content:"AWA AUTO MALL | Cars & Spare Parts"},{property:"og:description",content:"Quality vehicles and automotive spare parts, sourced in China and supplied globally."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"/"}]}),
 component:HomePage,
});