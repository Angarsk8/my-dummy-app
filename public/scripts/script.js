$(document).ready(function () {

    $('.closing-icon').on('click', function (e) {
        e.preventDefault();
        var id = $(this).parents().eq(2).attr('id');
        id = id.slice(id.indexOf('-') + 1, id.length);

        $("#delete-form").attr("action", "delete/" + id);
        $('#delete-confirm').modal('show');
    });

    var cleanInputForm = function () {
        $('input[name="note_title"]')
            .val('')
            .removeClass('error');
        $('textarea[name="note_content"]')
            .text('')
            .removeClass('error');
        $('label.error').remove();
        $('#task-form').attr("action", "/");
        $('input.hidden-input').remove();
    }

    $('.add-task').on('click', function (e) {
        e.preventDefault();
        cleanInputForm();
        $('#input-form').modal('show');
    });

    $('.delete-button').on('click', function (e) {
        e.preventDefault();
        var id = $(this).attr('class').split(' ')[5]

        $("#delete-form").attr("action", "delete/" + id);
        $('#delete-confirm').modal('show');
    });

    $('.edit-button').on('click', function (e) {
        e.preventDefault();
        cleanInputForm();
        var id = $(this).attr('class').split(' ')[5];
        var title = $('h3#title-' + id + ' span').text().slice(0, -1).toString();
        var content = $('div#content-' + id).text().toString();
        var $hiddenInput = '<input class="hidden-input" type="hidden" name="_method" value="put">'

        $('input[name="note_title"]').val(title);
        $('textarea[name="note_content"]').text(content);
        $('#task-form')
            .attr("action", "edit/" + id)
            .append($hiddenInput);
        $('#input-form').modal('show');
    });

    $('#task-form').validate({
        rules: {
            note_title: {
                required: true,
            },
            note_content: {
                required: true,
            }
        },
        messages: {
            note_title: {
                required: "Please, enter a title for your note!"
            },
            note_content: {
                required: "Please, enter a description for your note!"
            }
        }
    });

    String.prototype.capitalize = function () {
        var param = this.split(/\s+/);

        for (var i = 0; i < param.length; i++) {
            param[i] = param[i].charAt(0).toUpperCase() + param[i].slice(1);
        }
        param = param.join(' ');
        return param;
    }

    $('#task-form').on('submit', function (e) {
        e.preventDefault();
        var noteTitle = $('input[name="note_title"]').val();

        $('input[name="note_title"]').val(noteTitle.capitalize());
        if (!$('input[name="note_title"]').val() && !$('textarea[name="note_content"]').text()) {
            return false;
        } else {
            $(this).unbind('submit').submit();
        }
    });
});