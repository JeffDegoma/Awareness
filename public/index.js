$( document ).ready(function(){

    //side nav
	$(".button-collapse").sideNav();
    //parallax
    $('.parallax').parallax();


    //accordian
    $('.collapsible').collapsible();


   
    


    //new momemnts page
    $('form').on('submit', (e)=>{
        e.preventDefault(e)
        let item = $('form .materialize-textarea').val()
        // let text = {item: item.val()}.val()
        // let text = item.val()


        $.ajax({
            type: 'POST',
            url: '/newMoments',
            data: {item: item},
            success: function(data){
                window.location.replace('/moments')
            },

            fail: ((err)=>{
                throw err;
            })
        })
        
    })    



    //attach delete button to post
    $('.collapsible').on('click','.delete', function(e) {
        e.preventDefault(e)

        let id = $(this).data('moment-id')


        $.ajax({
            type: 'DELETE',
            url: '/moments/' + id,
            success: function(data){
                // console.log(data)
                repaintTheDOM()
            },

            fail: ((err)=>{
                throw err;
            })
        })

    })

     $('.collapsible').on('click','.edit', function(e) {
        e.preventDefault(e)

        const id = $(this).data('moment-id')        //create a const called moment
        const moment = $(this).siblings('input').val()
        
        console.log("ID", id)
        console.log("MOMENT", moment)

        $.ajax({
            type: 'PUT',
            url: '/moments/' + id,
            data: {moment},
            success: function(data){

                // console.log(data)
                repaintTheDOM()
            },

            fail: ((err)=>{
                throw err;
            })
        })

    })



    const activeArray = []
    
    $('.collapsible').on('click', 'li', function(e){
        e.preventDefault(e)
        
        const id = $(this).find('.edit').data('moment-id') 
        const active = $(this).hasClass('active')

        if(active && !activeArray.includes(id)){
            activeArray.push(id)
        }

        else if (!active) {
            const index = activeArray.indexOf(id)
            activeArray.splice(index, 1)
        }
    })

    // repaintTheDOM
        // hits a route that gets all the data
        // targets the content inside of the accordian
        // wipes out everything that is there
        // loops over data and paints the DOM
        // find classes and update 

    const templateStr = 
            `<li>
              <div class="collapsible-header"><i class="material-icons"></i>Moment:</div>
              <div class="collapsible-body">
                <input class="momentText">
                <a class="waves-effect waves-light btn delete" data-moment-id="" >delete</a>
                <a class="waves-effect waves-light btn edit" data-moment-id="">edit</a>
              </div>
            </li>`

    function repaintTheDOM() {
        $.ajax({
            type: 'GET',
            //doesn't need to run
            url: '/moments/all',
            success: function(data){
                console.log(data)
            
                $('.collapsible').html('')

                const appendTo = data.map(function(moment){
                    const str = $(templateStr);
                    str.find('.momentText').val(moment.moment)
                    str.find('.delete').data('moment-id', moment._id)
                    str.find('.edit').data('moment-id', moment._id)
                    // if in active array
                    if(activeArray.includes(moment._id)){
                        str.addClass('active')
                        str.find('.collapsible-header').addClass('active')
                        str.find('.collapsible-body').show()
                    }

                    return str
                }) 

                $('.collapsible').html(appendTo)
    
            }
        })

    }

  

})

