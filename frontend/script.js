
    document.addEventListener("DOMContentLoaded", function () {
        $.get("http://numbersapi.com/1/30/date?json", function (data) {
            $("#fact").text(data.text);
        });


        let dropArea = $('#drop-area');
        dropArea.on('click', function () {
        $('#fileElem').click();
    });

    dropArea.on('dragover', function (event) {
        event.preventDefault();
        dropArea.css('background', 'rgba(255, 255, 255, 0.3)');
    });

    dropArea.on('dragleave', function () {
        dropArea.css('background', 'rgba(255, 255, 255, 0.2)');
    });

    dropArea.on('drop', function (event) {
        event.preventDefault();
        dropArea.css('background', 'rgba(255, 255, 255, 0.2)');
        let files = event.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    $('#fileElem').on('change', function (event) {
        let files = event.target.files;
        handleFiles(files);
    });
    

    function handleFiles(files) {
        if (files.length > 0) {
            let file = files[0];
            let formData = new FormData();
            formData.append('image', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                
                .catch(error => console.error('Error:', error));


            let reader = new FileReader();
            reader.onload = function (e) {
                $('#preview').html(file.name);
            };
            reader.readAsDataURL(file);


        }
    }

    //Classes Section
    const classCards = $(".class-card");
    const classBackground = $("#classBackground");

 
    classCards.hover(
        function () { // Mouse enter
            let bgImage = $(this).attr("data-image");
            classBackground.css("background", `url('${bgImage}') no-repeat center center/cover`);
        },
        function () { // Mouse leave
            classBackground.css("background", "url('Images/class1.jpg') no-repeat center center/cover");
        }
    );

   
        const clubSection = $(".club");
        const clubCards = $(".club-card");

        clubCards.hover(
            function () { // Mouse enter
                let bgImage = $(this).attr("data-bg");
                clubSection.css("background", `url('${bgImage}') no-repeat center center/cover`);
            },
            function () { // Mouse leave
                clubSection.css("background", "url('Images/club1.jpg') no-repeat center center/cover");
            }
        );
   //Membership Section
        const ITEMS = document.querySelectorAll('.item')
        ITEMS.forEach(item => {
            item.addEventListener('click', () => {
                removeActionClasses()
                item.classList.add('active')
            })
        })
        function removeActionClasses() {
            ITEMS.forEach(item => {
                item.classList.remove('active')
            })
        }

        let currentIndex = 0;
        const items = document.querySelectorAll('.item');


        //Carousal Section
        $('.owl-carousel').owlCarousel({
            mouseDrag: false,
            loop: true,
            margin: 2,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 3
                }
            }
        });

        $('.owl-prev').click(function () {
            $active = $('.owl-item .item-carousal.show');
            $('.owl-item .item-carousal.show').removeClass('show');
            $('.owl-item .item-carousal').removeClass('next');
            $('.owl-item .item-carousal').removeClass('prev');
            $active.addClass('next');
            if ($active.is('.first')) {
                $('.owl-item .last').addClass('show');
                $('.first').addClass('next');
                $('.owl-item .last').parent().prev().children('.item-carousal').addClass('prev');
            }
            else {
                $active.parent().prev().children('.item-carousal').addClass('show');
                if ($active.parent().prev().children('.item-carousal').is('.first')) {
                    $('.owl-item .last').addClass('prev');
                }
                else {
                    $('.owl-item .show').parent().prev().children('.item-carousal').addClass('prev');
                }
            }
        });

        $('.owl-next').click(function () {
            $active = $('.owl-item .item-carousal.show');
            $('.owl-item .item-carousal.show').removeClass('show');
            $('.owl-item .item-carousal').removeClass('next');
            $('.owl-item .item-carousal').removeClass('prev');
            $active.addClass('prev');
            if ($active.is('.last')) {
                $('.owl-item .first').addClass('show');
                $('.owl-item .first').parent().next().children('.item-carousal').addClass('prev');
            }
            else {
                $active.parent().next().children('.item-carousal').addClass('show');
                if ($active.parent().next().children('.item-carousal').is('.last')) {
                    $('.owl-item .first').addClass('next');
                }
                else {
                    $('.owl-item .show').parent().next().children('.item-carousal').addClass('next');
                }
            }
        });
});
