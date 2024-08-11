"use client";

import { createUrlSearchParams, debounce } from "@acdh-oeaw/lib";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";

const languages = {
  en: "English",
  de: "German",
  it: "Italian",
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onUpdateSearchParams(event: FormEvent<HTMLFormElement>) {
    const element = event.currentTarget;
    const formData = new FormData(element);
    const q = formData.get("q") as string;
    const language = formData.getAll("language") as string[];

    void router.push(`?${createUrlSearchParams({ q, language })}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const q = searchParams.get("q") ?? "";
  const language = searchParams.getAll("language");

  return (
    <main className="p-8">
      <form
        className="grid gap-y-6"
        role="search"
        onChange={onUpdateSearchParams}
        onSubmit={onSubmit}
      >
        <label>
          <span>Search</span>
          <input
            className="border border-neutral-400 shadow rounded px-4 py-1"
            defaultValue={q}
            name="q"
            type="search"
          />
        </label>

        <fieldset className="grid gap-y-2">
          <legend>Language (native)</legend>
          {Object.entries(languages).map(([key, label]) => {
            return (
              <label key={key} className="flex gap-x-1 items-center">
                <input
                  defaultChecked={language.includes(key)}
                  name="language"
                  type="checkbox"
                  value={key}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="grid gap-y-2">
          <legend>Language (radix)</legend>
          {Object.entries(languages).map(([key, label]) => {
            return (
              <label key={key} className="flex gap-x-1 items-center">
                <Checkbox.Root
                  className="inline-grid place-content-center shadow border border-neutral-400 overflow-hidden size-4 appearance-none rounded bg-white"
                  defaultChecked={language.includes(key)}
                  name="language"
                  value={key}
                >
                  <Checkbox.Indicator className="text-white bg-sky-500">
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span>{label}</span>
              </label>
            );
          })}
        </fieldset>
      </form>
    </main>
  );
}
