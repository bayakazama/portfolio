import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { ModeToggle } from '@/components/ModeToggle';

type NavbarClientProps = {
    pathname: string
}

const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
]

function isActive(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/"
    }

    return pathname.startsWith(href)
}

export function NavbarClient({ pathname }: NavbarClientProps) {
    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <nav
                className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4"
                aria-label="Main navigation"
            >
                <a href="/" className="inline-flex items-center gap-2">
                    <span className="inline-flex size-7 items-center justify-center border bg-muted text-[10px] font-semibold tracking-widest text-muted-foreground">
                        G
                    </span>
                    <span className="text-sm font-semibold tracking-tight">Grimsmo</span>
                </a>

                <div className="hidden items-center gap-6 md:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            {navItems.map((item) => {
                                const active = isActive(pathname, item.href)

                                return (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuLink
                                            href={item.href}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                active && "bg-muted text-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-2">
                        <ModeToggle />
                    </div>
                </div>

                <div className="md:hidden">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[84vw] max-w-sm">
                            <SheetHeader>
                                <SheetTitle>Navigation</SheetTitle>
                                <SheetDescription>
                                    Browse the main sections and account actions.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex flex-col gap-1 px-4 pb-4">
                                {navItems.map((item) => {
                                    const active = isActive(pathname, item.href)

                                    return (
                                        <Button
                                            key={item.href}
                                            asChild
                                            variant="ghost"
                                            className={cn(
                                                "justify-start",
                                                active && "bg-muted text-foreground"
                                            )}
                                        >
                                            <a href={item.href} aria-current={active ? "page" : undefined}>
                                                {item.label}
                                            </a>
                                        </Button>
                                    )
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    )
}
