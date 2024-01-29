const NotFoundPage = () => {
  return (
    <div className="m-0 text-white bg-black font-Gotham min-h-screen text-center flex flex-col items-center justify-center">
      <div>
        <h1 className="border-r-[1px] border-solid border-[#0000004d] inline-block m-0 mr-5 p-0 pr-6 text-[24px] font-medium align-top leading-[49px]">
          404
        </h1>
        <div className="inline-block text-left leading-[49px] h-[49px] align-top">
          <h2 className="text-[14px] font-normal leading-[49px] m-0 p-0">
            This page could not be found!.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
