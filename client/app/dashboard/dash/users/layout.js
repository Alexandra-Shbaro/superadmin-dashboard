import { Navbar } from "./components/Navbar";

export default function DashLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main >
                {children}
            </main>
        </div>

    );
}