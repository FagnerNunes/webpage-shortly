$(".menu-mob").on("click", () => {
    $("nav").toggleClass("open");
});

const getLink = async () => {
    const inputData = $("#input-shorten");

    try {

        const getlink = await fetch('https://is.gd/create.php?format=json&url=${inputData.val()}');
        
        const newlink = await getlink.json();

        if(newlink.errormessage.length > 0) {
            return $('.erro').append(newlink.errormessage)
        }
        
        $(".container-retorno-api").append(
            `
                <div class="container-link-novo">
                    <p class="link-inserido">${inputData.val().slice(0, 31)}...</p>
                    <div class="container2">
                        <p class="link-novo">${newlink.shorturl}</p>
                        <button type="button" class="btn-copiar-link" onClick="copiar()">Copy</button>
                    </div>
                </div>
            `
        );

    } catch (error) {
        $('.erro').append(error)
    }


    inputData.val("");
    
}


const copiar = () => {
    navigator.clipboard.writeText($(".link-novo").html());

    $(".btn-copiar-link").addClass("copiado");
    $(".btn-copiar-link").html("Copied!");

    setInterval(() => {
        $(".btn-copiar-link").removeClass("copiado");
        $(".btn-copiar-link").html("Copy");
    }, 3000);
};

const validarForm = () => {
    const inputData = $("#input-shorten").val();

    if(inputData == '' || inputData.length < '10') {
        $(".erro").html("Please add a link");
        $("#input-shorten").css({"border-color":"hsl(0, 87%, 67%)"});

        setInterval(() => {
            $(".erro").html("");
            $("#input-shorten").css({"border-color":"transparent"});
        }, 6000);
        
        return false;
    }

    return true;
}

$("#btn-shorten").on("click", () => {
    if(validarForm()) {
        getLink();
    }
});
