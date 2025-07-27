// components/ui/multi-select-combobox.tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface MultiSelectComboboxProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCombobox({
  options,
  selected,
  onChange,
  placeholder = "Sélectionner..."
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const createNewCategory = async (name: string) => {
    try {
      const response = await fetch('/api/podcasts/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la catégorie');
      }

      const newCategory = await response.json();
      options.push({ label: newCategory.name, value: newCategory.id });
      onChange([...selected, newCategory.id]);
      toast.success('Nouvelle catégorie ajoutée');
      setInputValue("");
    } catch  {
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selected.length === 0
              ? placeholder
              : `${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput 
            placeholder="Rechercher une catégorie..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty className="p-2">
            {inputValue && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => createNewCategory(inputValue)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Créer "{inputValue}"
              </Button>
            )}
            {!inputValue && "Aucune catégorie trouvée"}
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  const newSelected = selected.includes(option.value)
                    ? selected.filter((item) => item !== option.value)
                    : [...selected, option.value];
                  onChange(newSelected);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value) 
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}