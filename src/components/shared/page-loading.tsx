import { Spinner } from './spinner';

export default function PageLoading() {
    return (
        <div className="flex flex-col flex-1 justify-center items-center bg-zinc-100 min-h-dvh">
            <Spinner className="w-6 h-6" />
        </div>
    );
}
