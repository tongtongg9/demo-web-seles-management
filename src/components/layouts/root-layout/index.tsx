import { Outlet } from 'react-router-dom';
import RootHeader from './root-header';

export default function RootLayout() {
    return (
        <div className="flex flex-col flex-1 bg-zinc-100 min-h-dvh">
            <RootHeader />
            <main
                className="flex flex-col flex-1 mx-auto py-6 w-full max-w-screen-2xl overflow-y-auto"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <Outlet />
            </main>
        </div>
    );
}
