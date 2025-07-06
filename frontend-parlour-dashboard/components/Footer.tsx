import { Separator } from "@/components/ui/separator"

const Footer = () => {
    return (
        <footer className="bg-indigo-800">
            <div className="container mx-auto text-center py-4">
                <Separator className="mb-4 bg-indigo-600" />
                <p className="text-indigo-100 text-sm">&copy; 2023 Parlour Dashboard. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;