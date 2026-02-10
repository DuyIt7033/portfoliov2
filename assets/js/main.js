// --- 1. DYNAMIC MODAL LOGIC (LOAD HTML FILE) ---

async function loadProject(url) {
    const modal = document.getElementById('projectModal');
    const contentBox = document.getElementById('dynamicContent');
    const loader = document.getElementById('modalLoading');

    // 1. Mở Modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    loader.classList.remove('hidden'); // Hiện loading
    contentBox.innerHTML = ''; // Xóa nội dung cũ
    document.body.style.overflow = 'hidden'; // Khóa cuộn trang chủ

    try {
        // 2. Tải file HTML
        const response = await fetch(url);
        if (!response.ok) throw new Error('File not found: ' + url);
        
        const htmlText = await response.text();

        // 3. Parse nội dung
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        // Tìm class .project-content trong file con (để tránh lấy thẻ head/body thừa)
        const content = doc.querySelector('.project-content') || doc.body;

        // Xóa nút "Back to Home" nếu có trong file con (vì đã dùng popup)
        const backBtns = content.querySelectorAll('a[href*="index.html"]');
        backBtns.forEach(btn => btn.remove());

        // 4. Đổ vào Modal
        contentBox.innerHTML = content.innerHTML;

    } catch (error) {
        console.error(error);
        contentBox.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full text-center p-10">
                <i class="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                <h3 class="text-2xl font-bold text-white">Lỗi tải dự án</h3>
                <p class="text-gray-400 mt-2">${error.message}</p>
                <p class="text-sm text-gray-500 mt-4 bg-gray-900 p-2 rounded inline-block">
                   Lưu ý: Chạy bằng "Live Server" trên VS Code để Fetch API hoạt động.
                </p>
            </div>
        `;
    } finally {
        // Tắt loading sau 300ms
        setTimeout(() => loader.classList.add('hidden'), 300);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}


// --- 2. DROPDOWN CV ---
function setupDropdown() {
    const button = document.getElementById('dropdownButton');
    const menu = document.getElementById('dropdownMenu');
    if (!button || !menu) return;

    button.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    document.addEventListener('click', function (event) {
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add('hidden');
      }
    });
}

// --- 3. INIT ---
document.addEventListener('DOMContentLoaded', function () {
    setupDropdown();

    // Đóng popup bằng phím ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });

    // Expose global functions
    window.loadProject = loadProject;
    window.closeProjectModal = closeProjectModal;
});