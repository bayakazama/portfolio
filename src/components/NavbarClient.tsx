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
import { ModeToggle } from '@/components/ModeToggle';

type NavbarClientProps = {}

const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
]

export function NavbarClient({ }: NavbarClientProps) {
    return (
        <header className="sticky top-0 z-40 border-neutral-800/30 bg-neutral-950/20 backdrop-blur-md supports-[backdrop-filter]:bg-neutral-950/20">
            <nav
                className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4"
                aria-label="Main navigation"
            >
                <a href="#home" className="inline-flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                    <span className="text-xl font-light tracking-tight text-neutral-200">Grimsmo</span>
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList className="gap-2">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink
                                        href={item.href}
                                        className={`${navigationMenuTriggerStyle()} text-xl font-light text-white hover:text-white/90 transition-colors`}
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>


                </div>

                <div className="flex md:hidden gap-2 items-center">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                                <MenuIcon className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[60vw] max-w-[18rem] sm:max-w-[20rem] max-h-[35vh] bg-gradient-to-br from-amber-950/90 to-amber-900/80 border border-white/70 shadow-2xl rounded-l-2xl">
                            <SheetHeader>
                                <SheetTitle className="text-lg text-amber-100 font-light">Navigation</SheetTitle>
                                <SheetDescription className="text-base text-amber-200/70 font-light">
                                    Navigate through my portfolio!
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex flex-col gap-2 px-4 pb-4 mt-6">
                                {navItems.map((item) => (
                                    <Button
                                        key={item.href}
                                        asChild
                                        variant="ghost"
                                        className="justify-start text-base text-amber-100/90 hover:text-amber-50 hover:bg-amber-900/40 font-light"
                                    >
                                        <a href={item.href}>
                                            {item.label}
                                        </a>
                                    </Button>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    )
}
