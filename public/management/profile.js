function feditprofile(id) {
    $.ajax({
        type: "GET",
        url: "/editprofile/" + id,
        success: function(data) {
            $("#edit-Items").modal('show');
            $("#edit-Items input[name=id]").val(data.detail.id);
            $("#edit-Items input[name=name]").val(data.detail.name);
        }
    });
}

$('#kt_modal_create_app_form').on('submit', function(e){
    e.preventDefault();
    $.ajaxSetup({
        headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
      });
    $.ajax({
        type: "POST",
        url: "/updateprofile/"+$("#kt_modal_create_app_form input[name=id]").val(),
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        dataType: "json",
        beforeSend: function(){
            $('.btn_update').addClass('btn-progress');
        },
        success: function(response) {
            if (response.success) {
                $('.btn_update').removeClass('btn-progress');
                $('#kt_modal_create_app_form')[0].reset();
                $("#edit-Items").modal('hide');
                setTimeout(function() {
                    location.reload();
                }, 1000);
                Swal.fire(
                    'Data save successfuly!',
                    'You clicked the button!',
                    'success'
                  )
                
            }
        }
    });
});