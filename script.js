function printpdf() {
    var content = document.getElementById("resume");

    // 1. Hide buttons and checkboxes
    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.classList.add("none");
    });
    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.classList.add("none");
    });

    // 2. TEMPORARY: Force Desktop Width for PDF Generation
    // We save the current width to restore it later
    const originalWidth = content.style.width;
    const originalMargin = content.style.margin;
    
    // Force A4 dimensions for the snapshot
    if (window.innerWidth < 850) {
        content.style.width = "800px";
        content.style.margin = "0 auto"; 
    }

    // 3. Generate PDF
    var opt = {
        margin:       0,
        filename:     'myResume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // Higher scale for better clarity
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(content).set(opt).save().then(() => {
        // 4. RESTORE: Bring back the mobile view and buttons after download
        if (window.innerWidth < 850) {
            content.style.width = originalWidth;
            content.style.margin = originalMargin;
        }

        allButtons.forEach(button => {
            button.classList.remove("none");
        });
        allInputCheckboxes.forEach(input => {
            input.classList.remove("none");
        });
    });
}