

const Title = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-5/12 my-5">
            <p className="text-black font-bold text-3xl mb-2">{subHeading}</p>
            <h3 className="text-lg uppercase border-y-4 py-2">{heading}</h3>
        </div>
    );
};

export default Title;