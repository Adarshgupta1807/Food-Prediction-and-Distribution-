export default function Loader({ label = "Loading..." }) {
    return (
        <div className="flex items-center justify-center py-10 text-slate-400 text-sm gap-2">
            <span className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
            {label}
        </div>
    );
}
