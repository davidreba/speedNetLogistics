document.addEventListener("DOMContentLoaded", function () {
    // Check if there's a language saved in localStorage
    let savedLanguage = localStorage.getItem("selectedLanguage");

    if (savedLanguage) {
        changeLanguage(savedLanguage); // Apply saved language
    }

    // Attach event listeners to flag buttons
    document.getElementById("btn-en").addEventListener("click", function () {
        changeLanguage("en");
    });

    document.getElementById("btn-bs").addEventListener("click", function () {
        changeLanguage("bs");
    });
});

// Function to change language
function changeLanguage(language) {
    localStorage.setItem("selectedLanguage", language); // Save selected language

    // Define translations
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
            sust_p1: "As a leader in transport and logistics, SpeedNet Logicstics has an important role to play in helping the industry transition to greener more environmentally friendly practices. We provide sustainable and efficient transport solutions through better planning, new technologies and innovative solutions. We work with sustainability across all areas of our business, from air, sea and road freight to contract logistics.",
            solu_h: "Explore your transport options",
            airfh: "Air freight",
            airfp: "When time and speed matter most",
            seah: "Sea freight",
            seap: "When cost matters and time is not an issue",
            roadh: "Road transport",
            roadp: "Local, long distance, national or international",
            railh: "Rail freight",
            railp: "The greener alternative",
            spth: "Special project transport",
            sptp: "Out of gauge and anything non-standard",
            courier_h: "Courier",
            courier_p: "When it's urgent and you need something delivered fast",
            contact_h: "Contact",
            contact_p: "If you have any questions or inquiries, feel free to reach out to us. We're here to help!",
            contact_tel: "Phone: (+387) 66 794 308",
            cariera_h: "Career",
            cariera_p1: "Looking for a new employment opportunity? Join our team!",
            cariera_p2: "For available positions, contact us at:",
            about_h: "About us",
            about_p: "Speednet Logistics d.o.o. is a logistics company based in Bijeljina, specializing in road freight transport. We provide reliable and efficient transportation services across Bosnia and Herzegovina and the region, ensuring the safe and timely delivery of various types of cargo. In addition to road transport, we offer different transport solutions tailored to our clients' needs, including combined and specialized transport. Our team of experienced professionals and a modern transport fleet guarantee high-quality service and customer satisfaction. Contact us for a safe and fast solution to your logistics needs!"
        },
        bs: {
            why_SNL: "Zašto SNL",  
            about: "O nama",  
            solutions: "Naša rešenja",
            career: "Karijera",        
            contact: "Kontakt",
            start_h1: "Povežite svoj biznis sa svetom",
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
            sust_p1: "Kao lider u transportu i logistici, SpeedNet Logistics ima važnu ulogu u pomaganju industriji da pređe na zelenije, ekološki prihvatljivije prakse. Pružamo održiva i efikasna transportna rješenja kroz bolje planiranje, nove tehnologije i inovativna rješenja. Radimo sa održivošću u svim područjima našeg poslovanja, od avio, pomorskog i cestovnog transporta do ugovorene logistike.",
            solu_h: "Istražite svoje opcije transporta",
            airfh: "Avio prijevoz",
            airfp: "Kada su vrijeme i brzina najvažniji",
            seah: "Pomorski prijevoz",
            seap: "Kada su troškovi važni, a vrijeme nije problem",
            roadh: "Cestovni prijevoz",
            roadp: "Lokalni, daljinski, nacionalni ili medjunarodni",
            railh: "Željeznicki prijevoz",
            railp: "Zelenija alternativa",
            spth: "Spec. transportni projekti",
            sptp: "Vangabaritni i nestandardni tereti",
            courier_h: "Kurirska dostava",
            courier_p: "Kada je hitno i treba brzo dostaviti",
            contact_h: "Kontakt",
            contact_p: "Ako imate bilo kakva pitanja ili upite, slobodno nas kontaktirajte. Tu smo da vam pomognemo!",
            contact_tel: "Telefon: (+387) 66 794 308",
            cariera_h: "Zaposlenje",
            cariera_p1: "Tražite novu priliku za zaposlenje? Pridružite se našem timu!",
            cariera_p2: "Za dostupne pozicije kontaktirajte nas na:",
            about_h: "O nama",
            about_p: "Speednet Logistics d.o.o. je logistička kompanija sa sjedištem u Bijeljini, specijalizovana za cestovni prijevoz robe. Pružamo pouzdane i efikasne transportne usluge širom Bosne i Hercegovine i regije, osiguravajući siguran i pravovremen transport različitih vrsta tereta. Pored cestovnog prevoza, nudimo i različite vrste transportnih rješenja prilagođenih potrebama naših klijenata, uključujući kombinovani i specijalizovani transport. Naš tim iskusnih profesionalaca i moderna transportna flota garantuju visok kvalitet usluge i zadovoljstvo naših klijenata. Kontaktirajte nas za sigurno i brzo rješenje vaših logističkih potreba!"
        }
    };
    
    // Loop through all translatable elements and update text
    for (let key in translations[language]) {
        let element = document.getElementById(key);
        if (element) {
            element.innerText = translations[language][key];
        }
    }
}