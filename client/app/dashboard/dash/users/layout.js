import { Navbar } from "./components/Navbar";

export default function DashLayout({ children }) {
    return (
        <div className="space-y-6">
            <Navbar />
            <main >
                {children}
            </main>
        </div>

    );
}