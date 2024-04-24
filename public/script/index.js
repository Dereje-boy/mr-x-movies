
const thumbnail_input = document.getElementById('thumbnail_input')
const thumbnail_preview = document.getElementById('thumbnail_preview');

$("#checkbox-show-more").on('change',(e)=>{
    // console.log(e.target.innerHTML);
    $('.show-more').toggleClass('d-flex d-none')
})

thumbnail_input.addEventListener('change',function (e){
    // console.log('rendering the image')
    const file = thumbnail_input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            thumbnail_preview.src = event.target.result;
            $('.preview-image').removeClass('d-none');
            $('.preview-image').addClass('d-flex');
            thumbnail_input.scrollIntoView({behavior:'smooth'})
        };
        reader.readAsDataURL(file);
    }
})

Array.from($('.thumbnail-image')).forEach(thisImage=>{

    const image = new Image();
    image.onload = function () {

        //hiding the animation svg
        $(thisImage).parent().children('.loading-svg').css('scale','0')
        $(thisImage).parent().children('.loading-svg').toggleClass('d-block d-none')

        //showing the image
        $(thisImage).css('scale','1')

        //changing the image src to correct path from its own alt
        thisImage.src = thisImage.alt;
    }
    image.src = thisImage.alt;
})

Array.from($('.single-card-container')).forEach(singleCardContainer=>{
    singleCardContainer.addEventListener('click',(e)=>{
        console.log(e.target.id);
        const thisID = singleCardContainer.id;
        movieClicked(thisID)
        console.log(singleCardContainer.id)
    })
})

function movieClicked(containerID) {
    const svgContainerID = 'image-hover-'+containerID
    if (selectedMovies.includes(containerID))//perform deselection
        {
            $(`#${svgContainerID}`).css('top','-350px')
            $(`#${svgContainerID} #ok-svg`).css('scale','1')
            $(`#${svgContainerID} #ok-right`).css('fill','green')
            selectedMovies.splice(selectedMovies.indexOf(containerID),1);
            renderSelectedMovies();
        }
    else// perform selection
        {
            $(`#${svgContainerID}`).css('top','0')
            $(`#${svgContainerID} #ok-svg`).css('scale','.4')
            $(`#${svgContainerID} #ok-right`).css('fill','white')
            selectedMovies.push(containerID);
            renderSelectedMovies();
        }
}

const selectedMovies = [];

function renderSelectedMovies() {
    $('#movie-modal-body').empty();
    selectedMovies.forEach((movie,index)=>{

        // const thisMovieP = $(`<p class="align-items-center d-flex justify-content-center">${movie}</p>`);

        const movie_name_h2 = $('#'+movie).children('.text-and-buttons').children('.movie-name')
        // console.log(movie_name_h2.text());

        const containerDiv = $('<div class="d-flex justify-content-between align-items-center overflow-hidden"></div>')
        const numberP = $(`<p class="px-2 fw-bold text-danger overflow-hidden">${index+1}</p>`)

        const thisMovieP = $(`<p class="fw-bold flex-grow-1 text-success d-flex justify-content-start">${movie_name_h2.text()}</p>`);

        const deleteMovie = $(`<button class="btn btn-danger fw-bold ">X</button>`);

        $(deleteMovie).on('click',(e)=>{
            // console.log($('#' + movie).click());
        })

        $(containerDiv).append($(numberP))
        $(containerDiv).append($(thisMovieP))
        $(containerDiv).append($(deleteMovie))

        $('#movie-modal-body').append(containerDiv);
    })
}

//searching movies
$('#search-button').click((e)=>{
    const value = $('#search-movies').val();
    $.get('/movies/search',(data,status)=>{
        //status === success if success
        if (status !== 'success') return;

        console.log(status);
        console.log(data);
    })
    console.log()
})