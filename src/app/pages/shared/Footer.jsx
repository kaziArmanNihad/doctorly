import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-[#E2E0D6] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-[12.5px] text-[#8A938D] md:flex-row">
        <span>© {new Date().getFullYear()} Doctorly. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href={"/"}>Privacy</Link>
          <Link href={"/"}>Terms</Link>
          <Link href={"/contact"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
