document.addEventListener("DOMContentLoaded", function () {
    const languageButtons = document.querySelectorAll("#btn-en, #btn-bs");

    // Set initial language from localStorage
    let savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }

    // Attach event listeners to flag buttons
    languageButtons.forEach(button => {
        button.addEventListener("click", function () {
            let selectedLanguage = this.getAttribute("data-lang");
            changeLanguage(selectedLanguage);
        });
    });
});
// Function to change language
function changeLanguage(language) {
    localStorage.setItem("selectedLanguage", language); // Save selected language

    // Define translations
    const translations = {
        en: {
            zagl_abus: "SNL About us",
            zagl_con: "SNL Contact",
            zagl_car: "SNL Career",
            why_SNL: "Why SNL", 
            about: "About us",  
            solutions: "Our solutions",
            career: "Career",        
            contact: "Contact",
            why_SNL_mob: "Why SNL", 
            about_mob: "About us",  
            solutions_mob: "Our solutions",
            career_mob: "Career",        
            contact_mob: "Contact",
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
            courier_p: "It's urgent and you need something delivered fast",
            contact_h: "Contact",
            contact_p: "If you have any questions or inquiries, feel free to reach out to us. We're here to help!",
			contact_req_email: "Your e-mail",
			contact_req_subject: "Subject",
			contact_req_message: "",
			send_button: "Send",
            contact_tel: "Phone: (+387) 66 794 308",
            contact_addr: "Address: Kneza Miloša 8/2, Bijeljina, BiH",
            cariera_h: "Career",
            cariera_p1: "Looking for a new employment opportunity? Join our team!",
            cariera_p2: "For available positions, contact us!",
            about_h: "About us",
            about_p: "Speednet Logistics d.o.o. is a logistics company based in Bijeljina, specializing in road freight transport. We provide reliable and efficient transportation services across Bosnia and Herzegovina and the region, ensuring the safe and timely delivery of various types of cargo. In addition to road transport, we offer different transport solutions tailored to our clients' needs, including combined and specialized transport. Our team of experienced professionals and a modern transport fleet guarantee high-quality service and customer satisfaction. Contact us for a safe and fast solution to your logistics needs!"
        },
        bs: {
            zagl_abus: "SNL O nama",
            zagl_con: "SNL Kontakt",
            zagl_car: "SNL Karijera",
            why_SNL: "Zašto SNL",  
            about: "O nama",  
            solutions: "Naša rešenja",
            career: "Karijera",        
            contact: "Kontakt",
            why_SNL_mob: "Zašto SNL",  
            about_mob: "O nama",  
            solutions_mob: "Naša rešenja",
            career_mob: "Karijera",        
            contact_mob: "Kontakt",
            start_h1: "Povežite svoj biznis sa svetom",
            start_p1: "Nije bitno da li vodite globalnu kompaniju ili lokalni startap. Tu smo da pomognemo vašem biznisu da raste.",
            why_SNL_h1: "Zašto SpeedNet Logistics treba da bude Vaš izbor kompanije za transport i logistiku?",
            why_SNL_p1: "Kao globalni špediter, SpeedNet Logistics svakodnevno pruza i upravlja logistickim rešenjima za hiljade kompanija. Bez obzira da li ste mala porodicna firma ili velika medjunarodna korporacija, naš fokus je na održavanju nesmetanog toka vaših lanaca snabdevanja kroz operativnu izvrsnost i održivi rast.",
            why_SNL_p2: "Naš strucni tim sa industrijskim znanjem, modernim skladištima, jakim partnerskim odnosima sa prevoznicima i globalnom mrežom u 80 zemalja omogucava nam da bolje odgovorimo na vaše potrebe. Pomažemo vam da postignete svoje poslovne ciljeve kroz jedinstvenu kombinaciju optimizovanih i fleksibilnih rešenja, u kombinaciji sa alatima za vidljivost, sigurnom IT infrastrukturom i održivošcu.",
            opti_h1: "Optimizacija",
            opti_p1: "SpeedNet Logistics pruza optimizirana transportna i logisticka rješenja dizajnirana od strane naših strucnjaka za lanac snabdijevanja, osiguravajuci pravu ravnotežu izmedju troškova, kompenzacije CO2, nivoa usluge, vremena isporuke i rizika. Naša globalna mreža i snažna partnerstva pružaju vam miks prevoznika prilagodjen vašim potrebama. Osiguravamo optimizaciju kroz sve transportne nacine koristeci uvide naših lokalnih strucnjaka.",
            s_v_h1: "Sigurnost i vidljivost",
            s_v_p1: "Kako bismo smanjili ugljenicni otisak vašeg lanca snabdijevanja, SpeedNet Logistics takodjer pruža konsolidaciju, promjenu transportnih nacina, optimizaciju utovara, stope popunjenosti kontejnera i globalnu transportnu mrežu. Sa timom industrijskih strucnjaka, spremni smo dizajnirati održiva rješenja koja vam pomažu da postignete zeleniji lanac snabdijevanja.",
            flex_h1: "Fleksibilnost",
            flex_p1: "SpeedNet Logistics je postao strucnjak za prilagodjavanje promjenjivim tržišnim uvjetima i pružanje fleksibilnih rješenja kako bi zadovoljio potrebe vašeg poslovanja. Naš poslovni model je 'light asset'. To znaci da možemo brzo skalirati aktivnosti kako bi se uskladili sa promjenama u tržišnoj potražnji. Takodjer, možemo odabrati najbolje dobavljace za bilo koju uslugu, ovisno o faktorima kao što su pouzdanost, dostupni kapacitet, vrijeme tranzita, faktori održivosti i cijena.",
            sust_h1: "Održivost",
            sust_p1: "Kao lider u transportu i logistici, SpeedNet Logistics ima važnu ulogu u pomaganju industriji da predje na zelenije, ekološki prihvatljivije prakse. Pružamo održiva i efikasna transportna rješenja kroz bolje planiranje, nove tehnologije i inovativna rješenja. Radimo sa održivošcu u svim podrucjima našeg poslovanja, od avio, pomorskog i cestovnog transporta do ugovorene logistike.",
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
			contact_req_email: "Vaš e-mail",
			contact_req_subject: "Tema",
			contact_req_message: "",
			send_button: "Pošalji",
            contact_tel: "Telefon: (+387) 66 794 308",
            contact_addr: "Adresa: Kneza Miloša 8/2, Bijeljina, BiH",
            cariera_h: "Zaposlenje",
            cariera_p1: "Tražite novu priliku za zaposlenje? Pridružite se našem timu!",
            cariera_p2: "Za dostupne pozicije kontaktirajte nas!",
            about_h: "O nama",
            about_p: "Speednet Logistics d.o.o. je logisticka kompanija sa sjedištem u Bijeljini, specijalizovana za cestovni prijevoz robe. Pružamo pouzdane i efikasne transportne usluge širom Bosne i Hercegovine i regije, osiguravajuci siguran i pravovremen transport razlicitih vrsta tereta. Pored cestovnog prevoza, nudimo i razlicite vrste transportnih rješenja prilagodjenih potrebama naših klijenata, ukljucujuci kombinovani i specijalizovani transport. Naš tim iskusnih profesionalaca i moderna transportna flota garantuju visok kvalitet usluge i zadovoljstvo naših klijenata. Kontaktirajte nas za sigurno i brzo rješenje vaših logistickih potreba!"
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