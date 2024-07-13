$(".menu-mob").on("click", () => {
    $("nav").toggleClass("open");
});

const getLink = async () => {
    const inputUrl = $("#input-shorten");
    const url = inputUrl.val().trim()
    try {

        const getlink = await fetch(`https://tinyurl.com/api-create.php?url=${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const newlink = await getlink.text();
        
        if (!newlink.length || newlink == 'Error') {
            return $('.erro').html('Failed to generate link')
        }

        $(".container-retorno-api").append(
            `
                <div class="container-link-novo">
                    <p class="link-inserido">${url.length > 32 ? url.slice(0, 31) + '...' : url.slice(0, 31)}</p>
                    <div class="container2">
                        <p class="link-novo">${newlink}</p>
                        <button type="button" class="btn-copiar-link">Copy</button>
                    </div>
                </div>
            `
        );

        if($('.container-link-novo').length > 0) {
            copiar()
        }

    } catch (error) {
        $('.erro').html('Failed to generate link')
    }

    inputUrl.val("");
}

const copiar = () => {
    $('.btn-copiar-link').on('click', function () {

        navigator.clipboard.writeText($(this).prev('.link-novo').text());
        
        $(this).addClass("copiado");
        $(this).html("Copied!");
    
        setInterval(() => {
            $(this).removeClass("copiado");
            $(this).html("Copy");
        }, 3000);
    
    })
};

const validarForm = () => {
    const inputData = $("#input-shorten").val();

    if (inputData == '' || inputData.length < '10') {
        $(".erro").html("Please add a link");
        $("#input-shorten").css({ "border-color": "hsl(0, 87%, 67%)" });

        setInterval(() => {
            $(".erro").html("");
            $("#input-shorten").css({ "border-color": "transparent" });
        }, 6000);

        return false;
    }

    return true;
}

$("#btn-shorten").on("click", () => {
    if (validarForm()) {
        getLink();
    }
});
