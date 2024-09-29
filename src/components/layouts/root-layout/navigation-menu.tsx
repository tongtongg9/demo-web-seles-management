import { cn } from '@/lib/utils';
import { Link, NavLink } from 'react-router-dom';
import { useNavigationItems } from './use-navigation-items';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import LogoApp from '@/components/shared/logo-app';

export default function NavigationMenu() {
    const [isSheetMenu, setIsSheetMenu] = useState(false);

    const [navItems] = useNavigationItems();

    return (
        <>
            <div className="block md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsSheetMenu(true)}
                    aria-label="Open navigation menu"
                >
                    <Menu className="w-4 h-4" />
                </Button>
            </div>

            <div className="md:block hidden">
                <ol className="flex justify-center items-center space-x-4">
                    {navItems.map((item) => (
                        <li key={item.title}>
                            <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                    cn(
                                        'inline-flex items-center px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground text-sm ',
                                        isActive && 'bg-accent text-accent-foreground'
                                    )
                                }
                            >
                                <item.icon className="mr-2 w-4 h-4" />
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ol>
            </div>

            <Sheet open={isSheetMenu} onOpenChange={setIsSheetMenu}>
                <SheetContent side="left" closeIcon={false}>
                    <SheetHeader className="mb-4 text-center">
                        <div onClick={() => setIsSheetMenu(false)}>
                            <Link to="/">
                                <LogoApp />
                            </Link>
                        </div>
                    </SheetHeader>

                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <li key={item.key} onClick={() => setIsSheetMenu(false)}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        cn(
                                            'inline-flex items-center px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground text-sm w-full',
                                            isActive && 'bg-accent text-accent-foreground'
                                        )
                                    }
                                >
                                    <item.icon className="mr-2 w-4 h-4" />
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </SheetContent>
            </Sheet>
        </>
    );
}
