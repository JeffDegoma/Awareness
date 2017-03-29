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

        let id = $(this).data('moment-id')
        console.log(id)


        $.ajax({
            type: 'PUT',
            url: '/moments/' + id,
            success: function(data){

                console.log(data)
            },

            fail: ((err)=>{
                throw err;
            })
        })

    })




    // repaintTheDOM
        // hits a route that gets all the data
        // targets the content inside of the accordian
        // wipes out everything that is there
        // loops over data and paints the DOM
        // find classes and update 

    const templateStr = `<li>
              <div class="collapsible-header"><i class="material-icons"></i>Moment:</div>
              <div class="collapsible-body">
                <span class="momentText"></span>
                <a class="waves-effect waves-light btn delete" data-moment-id="" >delete</a>
                <a class="waves-effect waves-light btn edit" data-moment-id=<%=moments[i]._id %>edit</a>
              </div>
            </li>`

    function repaintTheDOM(){
        $.ajax({
            type: 'GET',
            //doesn't need to run
            url: '/moments/all',
            success: function(data){
                console.log(data)
            
                $('.collapsible').html('')

                const appendTo = data.map(function(moment){
                    const str = $(templateStr);
                    str.find('.momentText').text(moment.moment)
                    str.find('.delete').data('moment-id', moment._id)

                    return str
                }) 

                $('.collapsible').html(appendTo)
    
            }
        })

    }

    function updateMoment(){

    }





  

})

