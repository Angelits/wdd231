document.getElementById("timestamp").value = new Date().toISOString();

    
    document.querySelectorAll(".open-modal").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).showModal();
      });
    });
    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest("dialog").close();
      });
    });

     

