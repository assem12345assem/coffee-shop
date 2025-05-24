import React from 'react';

function LocationSection() {
  return (
    <div className=" w-full overflow-hidden p-[30px] bg-whiteCoffee drop-shadow-locationSectionShadow  relative -top-[50px] left-0">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.7858006547262!2d44.81387717647689!3d41.69765557669201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cfd14a9a29b%3A0x9a438625d9da2c32!2sHoly%20Trinity%20Cathedral%20of%20Tbilisi!5e1!3m2!1sen!2sge!4v1747380136914!5m2!1sen!2sge"
        width="100%"
        height="450"
        className="border-8 border-solid border-brownTransparent"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location - Holy Trinity Cathedral of Tbilisi"
      />
    </div>
  );
}

export default LocationSection;
