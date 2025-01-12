export default function SignupLayout({ children }) {
    return (
        <div>
            <div className="text-center mb-8">
                <img
                    src="/lumilogo.svg" // Replace this with the actual path to your logo
                    alt="Lumi Logo"
                    className="mx-auto w-42 h-20 mb-10" // Adjust width (w-32) and height (h-32) as per your requirements
                />

                <p className="text-mediumGrey">Finish setting up your profile</p>
            </div>
            <main>{children}</main>
        </div>
    );
}
