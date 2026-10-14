"use client";

import { useEffect, useState } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "../src/router";

type ClientMarketplaceProps = { pathname: string };

export function ClientMarketplace({ pathname }: ClientMarketplaceProps) {
  const [router, setRouter] = useState<ReturnType<typeof getRouter> | null>(null);

  useEffect(() => {
    if (window.location.pathname !== pathname) window.history.replaceState({}, "", pathname);
    setRouter(getRouter());
  }, [pathname]);

  if (!router) return null;
  return <RouterProvider router={router} />;
}
