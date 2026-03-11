document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    const inputContainer = document.createElement('div');
    // input template
    inputContainer.className = 'input-container';
    inputContainer.innerHTML = `
        <input type="text" class="idea-input" placeholder="Уточните запрос...">
        <button class="submit-btn" title="Сгенерировать">&#10140;</button>
    `;

    const input = inputContainer.querySelector('.idea-input');
    const submitBtn = inputContainer.querySelector('.submit-btn');
    let activeCategory = '';

    // remove active class from buttons when click outside
    document.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
    });

    buttons.forEach(btn => {
        const textSpan = btn.querySelector('.btn-text');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (this.classList.contains('active')) return;

            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            this.appendChild(inputContainer);

            activeCategory = textSpan.textContent.trim();
            input.value = '';
            input.focus();
        });
    });

    const generateIdea = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const query = input.value.trim();

        const result = document.querySelector('.result');
        if (query) {
            result.innerHTML = `<p>Здесь будет генерация для: ${activeCategory} — ${query}<br>(Если мне будет не лень)</p>`;
        }

        const activeBtn = document.querySelector('.btn.active');
        if (activeBtn) activeBtn.classList.remove('active');
    };

    submitBtn.addEventListener('click', generateIdea);

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') generateIdea(e);
    });
});
