import { SiFacebook, SiInstagram, SiTwitter, SiYoutube } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="flex flex-col max-w-5xl items-center mx-auto px-12 py-4 font-thin text-xs text-left text-zinc-400">
      <div className="flex w-full text-white text-2xl gap-8">
        <SiFacebook /> <SiInstagram /> <SiTwitter />
        <SiYoutube />
      </div>
      <h4 className="w-full py-4">Questions? Call 1-866-579-7172</h4>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">
          <span>FAQ</span>
          <span>Investor Relations</span>
          <span>Ways to watch</span>
          <span>Ways to watch</span>
          <span>Corporate information</span>
          <span>Netflix Originals</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Help Center</span>
          <span>Jobs</span>
          <span>Terms of use</span>
          <span>Contact us</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Acount</span>
          <span>Redeem gift cards</span>
          <span>Privacy</span>
          <span>Speed test</span>
        </div>
        <div className="flex flex-col gap-2">
          <span>Media center</span>
          <span>Buy gift cards</span>
          <span>Cookie preferences</span>
          <span>Legal notices</span>
        </div>
      </div>
    </footer>
  );
}
