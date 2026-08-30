const TEMPLATE_URL =
  "https://github.com/zhengzangw/nextjs-portfolio-blog-research";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto max-w-7xl px-6 py-8 pb-20 text-center text-sm md:pb-8 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <p>{`© ${year} Shang-Jing Lyu. All Rights Reserved.`}</p>
        <p className="mt-1">
          {`Powered by `}
          <a
            href={TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline-offset-4 hover:underline"
          >
            zhengzangw/nextjs-portfolio-blog-research
          </a>
        </p>
      </div>
    </footer>
  );
}
