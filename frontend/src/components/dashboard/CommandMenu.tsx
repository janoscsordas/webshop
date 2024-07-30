import * as React from "react"
import {
  Calculator,
  Package2,
  ShoppingCart,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Link } from "@tanstack/react-router";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground hidden sm:block">
        Press to search {" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden.Root>
          <DialogTitle>Command Menu</DialogTitle>
          <DialogDescription>Type a command or search...</DialogDescription>
        </VisuallyHidden.Root>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Link to="/admin/dashboard/products/create" className="flex">
                <Package2 className="mr-2 h-4 w-4" />
                <span>Create new Product</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link to="/admin/dashboard/orders" className="flex" >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>View Orders</span>
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Tools">
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu