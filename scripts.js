const companies = [
    { name: "Hadrian", description: "Hadrian is a cutting-edge manufacturing company that aims to revolutionize the US industrial base by enabling advanced manufacturers in Space, Defense, Semiconductor, Energy, and Medical Devices to produce products more efficiently and cost-effectively. The company is building a network of highly automated precision component factories across the US to address the bottleneck in America's Space & Defense industry, which is currently reliant on a network of owner-operated machine shops.", icon: "🏭", openPositionsLink: "https://www.hadrian.co/careers" },
    { name: "ABL Space Systems", description: "ABL Space Systems is a leading aerospace and launch service provider based in El Segundo, California. The company specializes in manufacturing deployable launch vehicles and infrastructure for sending commercial small satellites into orbit. With a focus on domestic production, ABL Space Systems manufactures its components in the United States, providing a reliable and efficient solution for satellite operators and space agencies.", icon: "🚀", openPositionsLink: "https://ablspacesystems.com/careers/" },
    { name: "Rainmaker", description: "Rainmaker is a pioneering company that has dedicated itself to solving the pressing issue of water scarcity. By leveraging cutting-edge technologies such as radar validation, autonomous systems, and numerical weather modeling, Rainmaker has transformed cloud seeding into a commercially viable solution with proven results. The company's innovative approach has enabled it to harness the power of clouds to increase precipitation and alleviate water shortages.", icon: "💧", openPositionsLink: "https://www.makerain.com/careers" },
    { name: "Valar", description: "Valar is a pioneering atomic energy company that is revolutionizing the way we generate power. By developing mass manufacturing capabilities for nuclear fission reactors, Valar is poised to transform the global energy landscape. The company's innovative technology enables the synthesis of abundant, low-cost hydrocarbons, which can be used to power the world.", icon: "☢️", openPositionsLink: "https://valaratomics.com/" },
    { name: "Rangeview", description: "Rangeview is a next-generation supplier dedicated to restoring the industrial foundation that made America a beacon of innovation and progress. The company specializes in producing high-quality alloys, including all aluminum, nickel, cobalt, and iron-based alloys, as well as advanced superalloys like MAR-M247, IN625, IN718, and X-40. Rangeview's proprietary digital casting technology is a game-changer in the industry, allowing for faster production times and fewer limits. The company's novel machines, materials, and software enable the creation of highly complex designs with intricate details, and its commitment to quality ensures that every part meets or exceeds customer and regulatory requirements. With Rangeview, customers can expect parts that are not only precise but also delivered quickly and efficiently.", icon: "🔧", openPositionsLink: "https://rangeview.com/#about" },
    { name: "Radiant", description: "Radiant Nuclear is a pioneering company that is revolutionizing the way we access clean energy. The company is developing portable 1-megawatt nuclear reactors that can be quickly deployed globally, providing a reliable and sustainable source of power. With the U.S. Nuclear Regulatory Commission (NRC) engaged in pre-application activities, Radiant Nuclear is poised to bring its innovative technology to the market.", icon: "⚡", openPositionsLink: "https://job-boards.greenhouse.io/radiant" },
    { name: "Varda", description: "Varda Space Industries is a pioneering space research company that is revolutionizing the way we produce pharmaceuticals. Founded in 2021, the company designs, builds, and flies spacecraft that process small molecule crystallization in microgravity, a process that is difficult to achieve on Earth. With its atmospheric reentry vehicle, Varda brings the crystals back to Earth, providing a new and innovative way to produce life-saving pharmaceuticals.", icon: "🌠", openPositionsLink: "https://www.varda.com/careers" },
    { name: "Neros", description: "Neros is a cutting-edge drone company that is revolutionizing the unmanned defense systems industry. With a focus on vertical integration, Neros is developing and manufacturing advanced unmanned systems in the United States, ensuring a secure supply chain. The company is pushing the boundaries of what is possible with autonomous technologies, engineering systems that were once unimaginable and deploying them globally across every domain.", icon: "🚁", openPositionsLink: "https://job-boards.greenhouse.io/nerostechnologies" }
];

function createCompanyCard(company) {
    return `
        <div class="card">
            <div class="card-header">
                <div class="icon">${company.icon}</div>
                <h2 class="card-title">${company.name}</h2>
            </div>
            <div class="card-content">
                <p>${company.description}</p>
            </div>
            <div class="card-footer">
                <a href="${company.openPositionsLink}" class="button">View Careers</a>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('companies-grid');
    companies.forEach(company => {
        grid.innerHTML += createCompanyCard(company);
    });
});
