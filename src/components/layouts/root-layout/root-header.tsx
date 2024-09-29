import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '@/services/auth.service';
import UserAvatar from '@/components/shared/user-avatar';
import { useAuth } from '@/hooks/use-auth-context';
import NavigationMenu from './navigation-menu';
import LogoApp from '@/components/shared/logo-app';
import RoleBadge from '@/components/shared/role-badge';

export default function RootHeader() {
    const navigate = useNavigate();

    const { user } = useAuth();

    function onSignOut() {
        authService.signOut().then(() => (location.href = '/sign-in'));
    }

    return (
        <header className="top-0 right-0 left-0 z-10 sticky flex flex-col flex-shrink-0 bg-background border-b border-b-border/90 w-full h-16">
            <div className="flex justify-between items-center px-4 md:px-0 w-full h-full container">
                <Link to="/" className="md:block hidden">
                    <LogoApp />
                </Link>

                <NavigationMenu />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="inline-flex focus:right-0 items-center space-x-2 bg-background px-2 py-1 border border-border rounded-full ring-0 cursor-pointer">
                            <UserAvatar fName={user!.first_name} lName={user!.last_name} />{' '}
                            <div className="px-2 font-medium text-left text-sm">
                                {user?.first_name}
                                <br />
                                <span className="text-muted-foreground text-xs">
                                    <RoleBadge role={user!.role} type="text" />
                                </span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                            {user?.first_name} {user?.last_name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                <User className="mr-2 w-4 h-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onSignOut}>
                                <LogOut className="mr-2 w-4 h-4" />
                                <span>Sign out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
