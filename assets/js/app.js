$( document ).ready(function() {

    $( '#fromDate, #toDate' ).change(function() {
        var fromDate = $('#fromDate');
        var toDate = $('#toDate');

        if (fromDate.val() && toDate.val()) {
            fromDateTimestamp = Date.parse(fromDate.val()) / 1000;
            toDateTimestamp = Date.parse(toDate.val()) / 1000;

            searchRooms(fromDateTimestamp, toDateTimestamp);            
        }
        
    });

    function getRooms(){
        $.ajax({
            url: '/api/rooms/'
        }).done(function(rooms) {
            render(rooms, {allowed: false});            
        });
    }
    getRooms();

    function searchRooms(startTimestamp, endTimestamp) {
        $.ajax({
            url: '/api/search/rooms/?startTimestamp=' + startTimestamp + '&endTimestamp=' + endTimestamp
        }).done(function(rooms) {
            render(
                rooms,
                {
                    allowed: true,
                    startTimestamp: startTimestamp,
                    endTimestamp: endTimestamp
                }
            );
        });
    }

    function bookRoom() {
        $( '.bookRoom' ).click(function() {
            $.ajax({
                type: 'POST',
                url: '/api/bookings/',
                data: {
                    user: 1,
                    startTimestamp: $(this).data('start-timestamp'),
                    endTimestamp: $(this).data('end-timestamp'),
                    room: $(this).data('room-id')
                }
            })
            .done(function(result) {
                $('#bookingFeedback .modal-body').html('Congratulations, your booking is confirmed!');                    
                $('#bookingFeedback').modal('show');                
            })
            .fail(function(error) {
                $('#bookingFeedback .modal-body').html('Error: ' + error.responseText);
                $('#bookingFeedback').modal('show');                                
            });
        });
    }

    function render(rooms, bookings){
        $( '#rooms' ).empty();
        $.each(rooms, function() {
            if (this.equipements) {
                var equipements = '<ul>';
                $.each(this.equipements, function() {
                    equipements += '<li>' + this.name + '</li>';
                });
                equipements += '</ul>';
            }

            $( '#rooms' ).append('<div class="col-md-4"><div class="card mb-4 box-shadow"><img class="card-img-top" src="https://picsum.photos/348/155?' + Date.now()  + '" alt="Card image cap"><div class="card-body"><p class="card-text"><b>' + this.name + '</b><br>' + this.description + '<br>Capacity: <b>' + this.capacity + '</b>' + (this.equipements.length > 0 ? '<br>Equipements: <b>' + equipements + '</b>': '') + '</p>' + (bookings.allowed ? '<div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" data-room-id="' + this.id + '" data-start-timestamp="' + bookings.startTimestamp + '" data-end-timestamp="' + bookings.endTimestamp + '" class="btn btn-sm btn-outline-secondary bookRoom">Book</button></div></div>': '') + '</div></div>');
        });
        bookRoom();
    }
});