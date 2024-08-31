const BlogCards = ({ image, title, description }) => {
  return (
    <>
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={image}
              alt="Blog Image"
            />
          </div>
          <div className="p-8">
            <h2 className="block mt-1 text-lg leading-tight font-semibold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-gray-600 text-base">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCards;
