export default function Footer() {
  return (
    <footer className="flex fixed bottom-0 w-full h-9 border-t-2 bg-gray-400">
      <a
        href="https://goerli.etherscan.io/address/0xf4f3E9F19Aa568848e145855416c205D4bA3Bfe0#code"
        className="border-b-2 mt-2 border-blue-500"
      >
        Click to View on Goerli Etherscan
      </a>
      <div className="ml-auto py-34 px-40">© Developed By:</div>
      <a className=" mr-auto py-34 px-40">Md Sumon</a>
    </footer>
  );
}
