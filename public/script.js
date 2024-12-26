document.addEventListener('DOMContentLoaded', function () {
    const etfSection = document.querySelector('.etf-section');

    etfData.forEach(etf => {
        // Erstelle das HTML für jeden ETF
        const etfItem = document.createElement('div');
        etfItem.classList.add('etf-item');

        const etfButton = document.createElement('button');
        etfButton.classList.add('toggle-btn');
        etfButton.textContent = etf.name;

        const etfContent = document.createElement('div');
        etfContent.classList.add('content');
        etfContent.style.display = 'none';

        etf.dates.forEach(date => {
            const dateSection = document.createElement('div');
            dateSection.classList.add('date-section');

            const dateButton = document.createElement('button');
            dateButton.classList.add('toggle-btn');
            dateButton.textContent = date.date;

            const dateContent = document.createElement('div');
            dateContent.classList.add('content');
            dateContent.style.display = 'none';

            date.categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');

                const categoryButton = document.createElement('button');
                categoryButton.classList.add('toggle-btn');
                categoryButton.textContent = category.name;

                const categoryContent = document.createElement('div');
                categoryContent.classList.add('content');
                categoryContent.style.display = 'none';

                const embed = document.createElement('embed');
                embed.src = category.report;
                embed.type = 'application/pdf';
                embed.style.width = '100%';
                embed.style.height = '500px';

                categoryContent.appendChild(embed);
                categoryDiv.appendChild(categoryButton);
                categoryDiv.appendChild(categoryContent);
                dateContent.appendChild(categoryDiv);
            });

            dateSection.appendChild(dateButton);
            dateSection.appendChild(dateContent);
            etfContent.appendChild(dateSection);
        });

        etfItem.appendChild(etfButton);
        etfItem.appendChild(etfContent);
        etfSection.appendChild(etfItem);
    });

    // Event-Listener für alle Buttons
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
});
