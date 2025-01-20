import React from 'react';
import Marquee from 'react-fast-marquee';
import Title from '../Shared/Title';

const MedicineMarquee = () => {
  const sponsors = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/WHO_logo.svg/312px-WHO_logo.svg.png?20220707000606",
      name: "WHO"
    },
    {
      logo: "https://www.beximco.com/themes/beximco/assets/images/beximco-logo.png",
      name: "Beximco"
    },
    {
      logo: "https://w7.pngwing.com/pngs/197/663/png-transparent-medecins-sans-frontieres-hd-logo.png",
      name: "Doctors Without Borders"
    },
    {
      logo: "https://s3.amazonaws.com/participedia.prod/88e5ceeb-8722-42d1-9eb5-8708dd132d3b",
      name: "UNICEF"
    },
    {
      logo: "https://redcrossdeoghar.org/assets/img/red%20cross.jpg",
      name: "Red Cross"
    },
    {
      logo: "https://medex.com.bd/storage/images/company_logos/he56uP8ysDXqsuuG03SjStweqrtSL9.png",
      name: "Incepta"
    },
    {
      logo: "https://seeklogo.com/images/S/square-pharma-logo-20BE0C02E0-seeklogo.com.png",
      name: "Square"
    },
    {
      logo: "https://media.licdn.com/dms/image/v2/C510BAQFb0qdrI-ue4Q/company-logo_200_200/company-logo_200_200/0/1631363709386?e=2147483647&v=beta&t=ImxgkOiZFEh-5Rn2gN3HXlqTOd95sO64N6tDbcGfK2k",
      name: "HealthCare"
    },
    {
      logo: "https://medex.com.bd/storage/images/company_logos/9AudX22YoAsfKjFQQkxPTrxkKpfUnv.png",
      name: "SK+F"
    },
  ];

  return (
    <div className="bg-gray-100">
      <Title subHeading="Sponsored by" heading="Bangladesh's largest pharmaceutical company" ></Title>
      <Marquee gradient={false} speed={50} loop={0}>
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center w-36 h-36 mx-5 overflow-hidden rounded-lg group transform transition-all hover:scale-105"
          >
            {/* Image with hover effect */}
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-full h-full object-cover group-hover:opacity-50"
            />
            {/* Sponsor name that appears on hover */}
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {sponsor.name}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MedicineMarquee;
