const translations = {
    en: {
        why_SNL: "Why SNL", 
        about: "About us",  
        solutions: "Our solutions",
        career: "Career",        
        contact: "Contact",
        start_h1: "Connect your business with the world",
        start_p1: "It doesn't matter if you run a global powerhouse or local startup. We're here to help your business grow.",
        why_SNL_h1: "Why SpeedNet Logistics should be your transport and logistics company of choice",
        why_SNL_p1: "As a global freight forwarder, SpeedNet Logistics provides and manages supply chain solutions for thousands of companies every day. Whether you are a small family-run businesses or large global corporation we focus on keeping your supply chains flowing through operational excellence and sustainable growth",
        why_SNL_p2: "Our skilled people with industry know-how, modern warehouses, strong carrier relationships and a global network across 80 countries position us to better serve your needs. We help you achieve your business objectives through a unique blend of optimised and flexible solutions, combined with visibility tools, secure IT infrastructure and sustainability.",
        opti_h1: "Optimisation",
        opti_p1: "SpeedNet Logistics provide optimised transportation and logistics solutions designed by our supply chain experts, ensuring the right balance between costs, CO2 compensation, service levels, lead times and risk. Our global network and strong partnerships provide you with a carrier mix tailored to your needs. We ensure optimisation across all modes of transport through the insights of our local experts.",
        s_v_h1: "Security and visibility",
        s_v_p1: "In order to reduce your supply chain’s carbon footprint, SpeedNet Logistics also provides consolidation, shift in transportation modes, load optimisation, container fill rates, and a global transportation network. With a team of industry experts, we are ready to design sustainable solutions that help you achieve a greener supply chain.",
        flex_h1: "Flexibility",
        flex_p1: "SpeedNet Logistics has become experts at adapting to changing market conditions and providing flexible solutions to meet your business needs. Our business model is asset light. This means we can quickly scale activities to match changes in market demand. We can also pick the best suppliers for any service depending on factors like reliability, available capacity, transit time, sustainability factors and price.",
        sust_h1: "Sustainability",
        sust_p1: "As a leader in transport and logistics, SpeedNet Logicstics has an important role to play in helping the industry transition to greener more environmentally friendly practices. We provide sustainable and efficient transport solutions through better planning, new technologies and innovative solutions. We work with sustainability across all areas of our business, from air, sea and road freight to contract logistics."
    },
    sr: {
        why_SNL: "Zašto SNL",  
        about: "O nama",  
        solutions: "Naša rešenja",
        career: "Karijera",        
        contact: "Kontakt",
        start_h1: "Povežite svoj posao sa svetom",
        start_p1: "Nije bitno da li vodite globalnu kompaniju ili lokalni startap. Tu smo da pomognemo vašem biznisu da raste.",
        why_SNL_h1: "Zašto SpeedNet Logistics treba da bude Vaš izbor kompanije za transport i logistiku?",
        why_SNL_p1: "Kao globalni špediter, SpeedNet Logistics svakodnevno pruza i upravlja logistickim rešenjima za hiljade kompanija. Bez obzira da li ste mala porodicna firma ili velika medjunarodna korporacija, naš fokus je na održavanju nesmetanog toka vaših lanaca snabdevanja kroz operativnu izvrsnost i održivi rast.",
        why_SNL_p2: "Naš strucni tim sa industrijskim znanjem, modernim skladištima, jakim partnerskim odnosima sa prevoznicima i globalnom mrežom u 80 zemalja omogucava nam da bolje odgovorimo na vaše potrebe. Pomažemo vam da postignete svoje poslovne ciljeve kroz jedinstvenu kombinaciju optimizovanih i fleksibilnih rešenja, u kombinaciji sa alatima za vidljivost, sigurnom IT infrastrukturom i održivošcu.",
        opti_h1: "Optimizacija",
        opti_p1: "SpeedNet Logistics pruža optimizirana transportna i logistička rješenja dizajnirana od strane naših stručnjaka za lanac snabdijevanja, osiguravajući pravu ravnotežu između troškova, kompenzacije CO2, nivoa usluge, vremena isporuke i rizika. Naša globalna mreža i snažna partnerstva pružaju vam miks prevoznika prilagođen vašim potrebama. Osiguravamo optimizaciju kroz sve transportne načine koristeći uvide naših lokalnih stručnjaka.",
        s_v_h1: "Sigurnost i vidljivost",
        s_v_p1: "Kako bismo smanjili ugljenični otisak vašeg lanca snabdijevanja, SpeedNet Logistics također pruža konsolidaciju, promjenu transportnih načina, optimizaciju utovara, stope popunjenosti kontejnera i globalnu transportnu mrežu. Sa timom industrijskih stručnjaka, spremni smo dizajnirati održiva rješenja koja vam pomažu da postignete zeleniji lanac snabdijevanja.",
        flex_h1: "Fleksibilnost",
        flex_p1: "SpeedNet Logistics je postao stručnjak za prilagođavanje promjenjivim tržišnim uvjetima i pružanje fleksibilnih rješenja kako bi zadovoljio potrebe vašeg poslovanja. Naš poslovni model je 'light asset'. To znači da možemo brzo skalirati aktivnosti kako bi se uskladili sa promjenama u tržišnoj potražnji. Također, možemo odabrati najbolje dobavljače za bilo koju uslugu, ovisno o faktorima kao što su pouzdanost, dostupni kapacitet, vrijeme tranzita, faktori održivosti i cijena.",
        sust_h1: "Održivost",
        sust_p1: "Kao lider u transportu i logistici, SpeedNet Logistics ima važnu ulogu u pomaganju industriji da pređe na zelenije, ekološki prihvatljivije prakse. Pružamo održiva i efikasna transportna rješenja kroz bolje planiranje, nove tehnologije i inovativna rješenja. Radimo sa održivošću u svim područjima našeg poslovanja, od avio, pomorskog i cestovnog transporta do ugovorene logistike."
    }
};

function changeLanguage(lang) {
    document.getElementById("why_SNL").innerText = translations[lang].why_SNL;
    document.getElementById("about").innerText = translations[lang].about;
    document.getElementById("solutions").innerText = translations[lang].solutions;
    document.getElementById("career").innerText = translations[lang].career;
    document.getElementById("contact").innerText = translations[lang].contact;
    document.getElementById("start_h1").innerText = translations[lang].start_h1;
    document.getElementById("start_p1").innerText = translations[lang].start_p1;
    document.getElementById("why_SNL_h1").innerText = translations[lang].why_SNL_h1;
    document.getElementById("why_SNL_p1").innerText = translations[lang].why_SNL_p1;
    document.getElementById("why_SNL_p2").innerText = translations[lang].why_SNL_p2;
    document.getElementById("opti_h1").innerText = translations[lang].opti_h1;
    document.getElementById("opti_p1").innerText = translations[lang].opti_p1;
    document.getElementById("s_v_h1").innerText = translations[lang].s_v_h1;
    document.getElementById("s_v_p1").innerText = translations[lang].s_v_p1;
    document.getElementById("flex_h1").innerText = translations[lang].flex_h1;
    document.getElementById("flex_p1").innerText = translations[lang].flex_p1;
    document.getElementById("sust_h1").innerText = translations[lang].sust_h1;
    document.getElementById("sust_p1").innerText = translations[lang].sust_p1;
    
    // Store the selected language in localStorage so it persists
    localStorage.setItem("selectedLanguage", lang);
}

// Load saved language on page refresh
window.onload = function () {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    changeLanguage(savedLang);
};