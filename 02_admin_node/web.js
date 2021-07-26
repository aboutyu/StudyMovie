var express 		= require('express');						// express 프레임워크
var exphbs 			= require('express-handlebars');			// handlebars template
var bodyParser		= require('body-parser');					// body-parser 라이브러리
var mysql 			= require('mysql');							// mysql 사용

var app 			= express();

// bodyparser 설정
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
  
// handlebars 설정
handlebars = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: './views/',
    extname: '.html'
});
app.engine('html', handlebars.engine);
app.set('views', './views');
app.set('view engine', 'html');

// MySQL 설정
var connection = mysql.createConnection({
	host     : 'yutaehun.shop',
	user     : 'aboutyu',
	password : 'jesuschrist',
	port     : '3306',
	database : 'booktest',
	multipleStatements: true
});

app.get('/', (req, res) => {

	res.send("네네");
});

////////////////////////////////////////////////////////
// 영화등록 리스트화면
app.get('/movie/list', (req, res) => {
	var urlstring = "http://m.kobis.or.kr"
	var detailurl = "/kobis/mobile/mast/mvie/searchMovieDtl.do?movieCd="

	var statement = "SELECT seq, sequence, title, country, genre, running, rating, director, ";
	statement = statement + "DATE_FORMAT(opendate,'%Y년') AS opendate, "
	statement = statement + "CONCAT('" + urlstring + "', thumbnail_image) AS thumbnail, ";
	statement = statement + "CONCAT('" + urlstring + "', '" + detailurl + "', sequence) AS detailurl ";
	statement = statement + "FROM movie_db ORDER BY seq DESC;";

	console.log(statement);
	connection.query(statement, (err, rows, fields) => {

		res.render('./list.html', {
			rows: rows
	    });
	});
});

// 영화등록 수정화면
app.get('/movie/view/', (req, res) => {
	
	var seq = req.query.seq;
  var statement = "SELECT seq, sequence, ranking, title, totsales, totaudit, totScreen, thumbnail_image, country,  ";
  statement = statement + "genre, running, rating, director, ";
  statement = statement + "DATE_FORMAT(opendate,'%Y-%m-%d') AS opendate ";
  statement = statement + "FROM movie_db WHERE seq=" + seq;
	console.log(statement);
	connection.query(statement, (err, rows, fields) => {
		var seq = rows[0].seq;
		var sequence = rows[0].sequence;
		var ranking = rows[0].ranking;
		var title = rows[0].title;
		var opendate = rows[0].opendate;
		var totsales = rows[0].totsales;
		var totaudit = rows[0].totaudit;
		var totScreen = rows[0].totScreen;
		var thumbnail_image = rows[0].thumbnail_image;
		var country = rows[0].country;
		var genre = rows[0].genre;
		var running = rows[0].running;
		var rating = rows[0].rating;
		var director = rows[0].director;

		res.render('./view.html', {
			seq : seq,
			sequence : sequence,
			ranking : ranking,
			title : title,
			opendate : opendate,
			totsales : totsales,
			totaudit : totaudit,
			totScreen : totScreen,
			thumbnail_image : thumbnail_image,
			country : country,
			genre : genre,
			running : running,
			rating : rating,
			director : director
	    });
	});
});

// 수정하기 액션
app.post('/movie/view/:seq/', (req, res) => {
	var seq = req.params.seq;

	var sequence = req.body.sequence;
	var ranking = req.body.ranking;
	var title = req.body.title;
	var opendate = req.body.opendate;
	var totsales = req.body.totsales;
	var totaudit = req.body.totaudit;
	var totScreen = req.body.totScreen;
	var thumbnail_image = req.body.thumbnail_image;
	var country = req.body.country;
	var genre = req.body.genre;
	var running = req.body.running;
	var rating = req.body.rating;
	var director = req.body.director;

  var statement = "UPDATE movie_db SET ";
  statement = statement + "sequence='" + sequence + "', ";
  statement = statement + "ranking='" + ranking + "', ";
  statement = statement + "title='" + title + "', ";
  statement = statement + "opendate='" + opendate + "', ";
  statement = statement + "totsales='" + totsales + "', ";
  statement = statement + "totaudit='" + totaudit + "', ";
  statement = statement + "totScreen='" + totScreen + "', ";
  statement = statement + "thumbnail_image='" + thumbnail_image + "', ";
  statement = statement + "country='" + country + "', ";
  statement = statement + "genre='" + genre + "', ";
  statement = statement + "running='" + running + "', ";
  statement = statement + "rating='" + rating + "', ";
  statement = statement + "director='" + director + "' ";
  statement = statement + "WHERE seq=" + seq;
  console.log(statement);

  connection.query(statement, (err, rows, fields) => {

    res.redirect("/movie/view/?seq=" + seq);
  });
});

// 영화등록 신규등록 화면
app.get('/movie/add/', (req, res) => {

  res.render('./add.html');
});

// 영화등록 신규등록 액션
app.post('/movie/add/', (req, res) => {

	var sequence = req.body.sequence;
	var ranking = req.body.ranking;
	var title = req.body.title;
	var opendate = req.body.opendate;
	var totsales = req.body.totsales;
	var totaudit = req.body.totaudit;
	var totScreen = req.body.totScreen;
	var thumbnail_image = req.body.thumbnail_image;
	var country = req.body.country;
	var genre = req.body.genre;
	var running = req.body.running;
	var rating = req.body.rating;
	var director = req.body.director;

	var statement = "INSERT INTO movie_db (sequence, ranking, title, opendate, totsales, totaudit, totScreen, thumbnail_image, country, genre, running, rating, director) VALUES (";
	statement = statement  + "'" + sequence + "', ";
	statement = statement  + "'" + ranking + "', ";
	statement = statement  + "'" + title + "', ";
	statement = statement  + "'" + opendate + "', ";
	statement = statement  + "'" + totsales + "', ";
	statement = statement  + "'" + totaudit + "', ";
	statement = statement  + "'" + totScreen + "', ";
	statement = statement  + "'" + thumbnail_image + "', ";
	statement = statement  + "'" + country + "', ";
	statement = statement  + "'" + genre + "', ";
	statement = statement  + "'" + running + "', ";
	statement = statement  + "'" + rating + "', ";
	statement = statement  + "'" + director + "');";

	connection.query(statement, (err, rows, fields) => {
		res.redirect('/movie/list');
	});
});

app.get('/movie/delete/:SEQ', (req, res) => {
	var seq = req.params.SEQ;
	var statement = "DELETE FROM movie_db WHERE seq=" + seq + ";";

	connection.query(statement, (err, rows, fields) => {
		res.redirect('/movie/list');
	});
});

////////////////////////////////////////////////////////
// 영화정보 리스트 API
app.get('/api/list', (req, res) => {
	var urlstring = "http://m.kobis.or.kr"
	var detailurl = "/kobis/mobile/mast/mvie/searchMovieDtl.do?movieCd="

	var pageSize = (req.query.pageSize ? req.query.pageSize : null);
	var page = (req.query.page ? req.query.page : null);
	console.log(pageSize, page);

	var stmtPaging = ""
	if (pageSize != null && page != null && page != 0) {
		let pageNum = (page - 1) * pageSize;
		stmtPaging = "LIMIT " + pageNum + ", " + pageSize;
	}

	var statement = "SELECT seq, sequence, title, country, genre, running, rating, director, ";
	statement = statement + "DATE_FORMAT(opendate,'%Y년') AS opendate, "
	statement = statement + "CONCAT('" + urlstring + "', thumbnail_image) AS thumbnail, ";
	statement = statement + "CONCAT('" + urlstring + "', '" + detailurl + "', sequence) AS detailurl ";
	statement = statement + "FROM movie_db " + stmtPaging;

	console.log(statement);

	console.log(statement)
	connection.query(statement, (err, rows, fields) => {
		// DB 데이터를 잘 가져온 경우 success, 에러난 경우 fail
		var result = "";
		var length = 0;
		if (err) {
			result = "fail";
		} else {
			result = "success";
			length = rows.length;
		}

		res.json({"result" : result, "total" : length, rows});
	});
});

app.listen(3000, () => {
	console.log('running backend server now...');
});
