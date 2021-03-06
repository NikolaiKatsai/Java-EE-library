$(document).ready(function () {
    getAllBooks();

    $('#create-book-form').submit(function (e) {
        e.preventDefault();

        console.log("ajax POST coming");

        $.ajax({
            type: 'POST',
            url: '/rest/book/add',
            dataType: 'text',
            data: JSON.stringify({
                isbn: $(this).find('[id=isbn]').val(),
                title: $(this).find('[id=title]').val(),
                author: $(this).find('[id=author]').val()
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json')
            },
            success: function (response, status, xhr) {
                console.log(JSON.stringify(response));
                $('#create-book-form')[0].reset();
                getAllBooks();
            }

        });
    });

    $('#search-book-form').submit(function (e) {
        e.preventDefault();

        console.log("ajax POST coming");

        // const searchObject = {};
        //
        // let titleVal = $(this).find('[id=title_search]').val();
        // let isbnVal = $(this).find('[id=isbn_search]').val();
        // let authorVal = $(this).find('[id=author_search]').val();
        //
        // console.log(searchObject);

        $.ajax({
            type: 'GET',
            url: '/rest/book/search',
            data: {
                title: $(this).find('[id=title_search]').val(),
                isbn: $(this).find('[id=isbn_search]').val(),
                author: $(this).find('[id=author_search]').val()
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json')
            },
            success: function (response, status, xhr) {
                console.log("Search book response: \n" + response);
                displayBooks(response);
            }

        });
    });

    $('#get-books').click(function () {
        $.ajax({
            url: '/rest/book/all',
            success: getAllBooks()
        });
    });

    function getAllBooks() {
        $.ajax({
            url: '/rest/book/all',
            success: function (response) {
                console.log(response);
                displayBooks(response);
            }
        });
    }

    function displayBooks(books) {
        $('#response-result').empty();

        books.forEach(function (book) {
            let bookURL = '/book/' + book.isbn;
            $('#response-result').append('<tr><td>' + book.isbn + '</td><td><a class="d-block text-dark" href="' + bookURL + '">' + book.title + '</a></td><td>' + book.author + '</td></tr>');
        });
    }
});