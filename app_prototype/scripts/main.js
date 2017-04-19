$( document ).ready( function ( ) {
    var sortType = 'TITLE';
    var datas = [ ];

    $( '#search-input' ).on( 'input', function ( e ) {
        $.ajax( 'http://www.omdbapi.com/?s=' + e.currentTarget.value ).done( function ( _datas ) {
            datas = _datas.Search;
            render( );
        });
    });

    $( '#title-input, #date-input' ).on( 'change', function ( e ) {
        switch ( e.currentTarget.value ) {
            case 'TITLE':
                sortType = 'TITLE';
                break;
            case 'DATE':
                sortType = 'DATE';
                break;
            default:
                sortType = 'TITLE';
                break;
        }

        render( );
    });

    function sortDatas( ) {
        var sortProp = '';

        switch ( sortType ) {
            case 'TITLE':
                sortProp = 'Title';
                break;
            case 'DATE':
                sortProp = 'Year';
                break;
            default:
                sortType = 'Title';
                break;
        }

        datas.sort( function ( a, b ) {
            if (a[sortProp] > b[sortProp])
                return 1;
            if (a[sortProp] < b[sortProp])
                return -1;
            return 0;
        });
    }

    function render( ) {
        datas && datas.length && sortDatas( );

        $( '.film-list' ).empty( );

        $.each( datas, function ( index, data ) {
            $( '.film-list' ).append( '<li>' + data.Title + '</li>' )
            $( '.film-list' ).find( 'li' ).eq( index ).append( '<div style="display: none;">Year: ' + data.Year + ', imdbID: ' + data.imdbID + '<br><img src="' + data.Poster + '"/> ' + '</div>' );
        });

        $( '.film-list li' ).on( 'click', function ( ) {
            $( this ).find( 'div' ).toggle( );
        });
    }
});
