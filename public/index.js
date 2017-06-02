$( document ).ready(() => {
    //side nav
	$(".button-collapse").sideNav();
    //parallax
    $('.parallax').parallax();
    //accordian
    $('.collapsible').collapsible();

    //mobile-modal
    $("#mobile-demo").click(() => {
        $("#myModal").modal();
    });

    //modal
    $("#myBtn").click(() => {
        $("#myModal").modal()
    })

    // Smooth Scroll to Signup
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 900);
        return false;
    });

    //Add a new moment ==================
    $('#new-moment').on('submit', (e)=>{
        e.preventDefault(e);
        let item = $('form .materialize-textarea').val();
        let title = $('input[name=title]').val()

        $.ajax({
            type: 'POST',
            url: '/newMoments',
            data: {item: item, title:title},
            success: ((data) => {
                window.location.replace('/moments');
            }),
            fail: ((err)=>{
                console.error("You must be logged in!", err);
            })
        });
    });

    //Delete moment======================================
    $('.collapsible').on('click','.delete', ((e) => {
        e.preventDefault(e);
        let id = $(this).data('moment-id');

        $.ajax({
            type: 'DELETE',
            url: '/moments/' + id,
            success: ((data) => {
                repaintTheDOM();
            }),
            fail: ((err)=>{
                throw err;
            })
        });
    });

    //Edit moment=====================================
    $('.collapsible').on('click','.edit', ((e) => {
        e.preventDefault(e);
        const id = $(this).data('moment-id');     
        const moment = $(this).siblings('input').val();
        
        console.log("ID", id);
        console.log("MOMENT", moment);

        $.ajax({
            type: 'PUT',
            url: '/moments/' + id,
            data: {moment},
            success: ((data) => {
                console.log(data);
                repaintTheDOM();
            }),
            fail: ((err)=>{
                throw err;
            })
        });
    });

    const activeArray = [];
    $('.collapsible').on('click', 'li', ((e) => {
        e.preventDefault(e);
        const id = $(this).find('.edit').data('moment-id') ;
        const active = $(this).hasClass('active');

        if(active && !activeArray.includes(id)){
            activeArray.push(id);
        }
        else if (!active) {
            const index = activeArray.indexOf(id);
            activeArray.splice(index, 1);
        }
    }));

    //Repaint the DOM======================================
    const templateStr = 
            `<li>
              <div class="collapsible-header"><i class="material-icons"></i>Moment:</div>
              <div class="collapsible-body">
                <input class="momentText">
                <a class="waves-effect waves-light btn delete" data-moment-id="" >delete</a>
                <a class="waves-effect waves-light btn edit" data-moment-id="">edit</a>
              </div>
            </li>`;

    const repaintTheDOM = () => {
        $.ajax({
            type: 'GET',
            url: '/moments/all',
            success: ((data) => {
                $('.collapsible').html('');
                const appendTo = data.map((moment) => {
                    const str = $(templateStr);
                    str.find('.momentText').val(moment.moment);
                    str.find('.delete').data('moment-id', moment._id);
                    str.find('.edit').data('moment-id', moment._id);
                    // if in active array
                    if(activeArray.includes(moment._id)){
                        str.addClass('active');
                        str.find('.collapsible-header').addClass('active');
                        str.find('.collapsible-body').show();
                    }
                    return str;
                });

                $('.collapsible').html(appendTo);
            })
        });
    }

});

