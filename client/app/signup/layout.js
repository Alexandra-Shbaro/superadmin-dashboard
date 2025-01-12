export default function SignupLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite p-4">
            <div className="text-center">
                <img
                    src="/lumilogo.svg" // Replace this with the actual path to your logo
                    alt="Lumi Logo"
                    className="mx-auto w-42 h-20 mb-10" // Adjust width (w-32) and height (h-32) as per your requirements
                />
                <p className="text-mediumGrey">Finish setting up your profile</p>
            </div>

            {children} {/* Render the children here */}
        </div>
    );
}
