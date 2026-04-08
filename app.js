const CONFIG = {
    base_url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSTBcphU6q1b4OapdaOWwjLYcrYLSrRnQ9tKe4KGBcrHvPK2jF1byxZIpjbGaaUQx8qbOGKzeobeWs/pub?output=csv',
    sheets: [
        { id: '0', name: 'Google Educator Nível 1' },
        { id: '351678237', name: 'Google Educator Nível 2' },
        { id: '294250963', name: 'Gemini' },
        { id: '813865191', name: 'Google Certified Instructor' }
    ]
};

const dom = {
    emailInput: document.getElementById('emailInput'),
    searchBtn: document.getElementById('searchBtn'),
    loader: document.getElementById('loader'),
    btnText: document.querySelector('.btn-text'),
    resultsSection: document.getElementById('resultsSection'),
    resultsGrid: document.getElementById('resultsGrid'),
    noResults: document.getElementById('noResults')
};

// Main function to fetch and process data
async function verifyCertification() {
    const email = dom.emailInput.value.trim().toLowerCase();
    
    if (!email) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    setLoading(true);
    resetUI();

    try {
        const fetchPromises = CONFIG.sheets.map(sheet => fetchSheetData(sheet));
        const allResults = await Promise.all(fetchPromises);
        
        // Flatten and filter results
        const foundCertifications = allResults
            .filter(result => result.data)
            .map((result, index) => {
                const sheetInfo = CONFIG.sheets[index];
                const matches = result.data.filter(row => {
                    // Search in "e-mail institucional" (Column B / index 1)
                    const institutionalEmail = (row[1] || '').toString().toLowerCase();
                    // Optional: search also in "e-mail da certificação" (Column C / index 2)
                    const certEmail = (row[2] || '').toString().toLowerCase();
                    return institutionalEmail === email || certEmail === email;
                });

                return matches.map(match => ({
                    level: sheetInfo.name,
                    validity: match[3] || 'Não informada',
                    status: match[4] || 'N/A'
                }));
            })
            .flat();

        displayResults(foundCertifications);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Ocorreu um erro ao buscar os dados da planilha. Verifique sua conexão.');
    } finally {
        setLoading(false);
    }
}

async function fetchSheetData(sheet) {
    const url = `${CONFIG.base_url}&gid=${sheet.id}`;
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: false, // Using indexes as derived from file inspection
            complete: (results) => resolve(results),
            error: (error) => reject(error)
        });
    });
}

function displayResults(certs) {
    if (certs.length === 0) {
        dom.noResults.classList.remove('hidden');
        dom.resultsSection.classList.add('hidden');
        return;
    }

    dom.noResults.classList.add('hidden');
    dom.resultsSection.classList.remove('hidden');
    dom.resultsGrid.innerHTML = '';

    certs.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        
        const statusClass = cert.status.toLowerCase().replace(/\s+/g, '-');
        
        card.innerHTML = `
            <div class="cert-header">
                <h3>${cert.level}</h3>
            </div>
            <div class="cert-info">
                <div class="info-item">
                    <span class="info-label">Validade</span>
                    <span class="info-value">${cert.validity}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status</span>
                    <span class="info-value">
                        <span class="status-badge status-check ${statusClass}">${cert.status}</span>
                    </span>
                </div>
            </div>
        `;
        dom.resultsGrid.appendChild(card);
    });
}

function setLoading(isLoading) {
    if (isLoading) {
        dom.loader.style.display = 'block';
        dom.btnText.style.display = 'none';
        dom.searchBtn.disabled = true;
    } else {
        dom.loader.style.display = 'none';
        dom.btnText.style.display = 'block';
        dom.searchBtn.disabled = false;
    }
}

function resetUI() {
    dom.resultsSection.classList.add('hidden');
    dom.noResults.classList.add('hidden');
    dom.resultsGrid.innerHTML = '';
}

// Event Listeners
dom.searchBtn.addEventListener('click', verifyCertification);
dom.emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyCertification();
});
