## Le MVC (Modèle View Controller), pour la récupération des données

Le site utilise un système de MVC pour la gestion des données en back-end.
Dans un premier temps, le modèle permet de définir le nom de la table concernée, ainsi que les données avec lesquelles on souhaite travailler (donc toutes les colonnes).

Par la suite, ce modèle est utilisé dans le contrôleur, où on va créer les fonctions, c'est à dire qu'est ce qu'on fait de la table qu'on vient de designer. Si une nouvelle table venait à être crée, on devrait d'abord créer son modèle comme ceci :

```php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
//Ici les imports obligatoires
  

class Category extends Model
{
protected $table = "categories";
//La table sur laquelle on travaille
protected $fillable = ["id", "sub_category", "category"];
//Les différentes colonnes de la table
public $timestamps = false;
//Permet de remplir les données que génère Laravel automatiquement
}
```

Ce fichier, Categories.php, sera situé dans le dossier Models de notre site. Par la suite, on va appeler le modèle dans le controleur, CategoriesController.php :

```php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Category;


class CategoriesController extends Controller
{

function createCategory(Request $request)
{
$category = new Category;
$category->sub_category = $request->sub_category;
$category->category = $request->category;
$category->save();
return response()->json([
"message" => "Catégorie créée !",
"category" => $category
], 201);
}

//Dans le cas d'un CRUD, on aura généralement 4 ou 5 méthodes dans notre classes, pour chaque évenement de notre API. Par exemple ici la fonction createCategory, qui sera appelée en POST, permet de créer une nouvelle entrée dans la table en utilisant les données passées en paramètre (généralement récupérées via un formulaire).

public function deleteCategory($id)
{
$category = Category::findOrFail($id);
$category->delete();
return response()->json(['message' => 'Catégorie supprimée.']);
}

//Delete, la méthode ci-dessus, supprimera l'entrée dont l'id est passé en paramètre. 

}
```

Enfin, pour créer les routes néccéssaires à la création de l'API, on se rendra dans le fichier api.php dans le dossier routes, pour créer une route par méthode dans notre controlleur. On importe le controleur dans le fichier, puis on crée les routes.

```php
use App\Http\Controllers\CategoriesController;

Route::post("categories/", [CategoriesController::class, "createCategory"]);
Route::delete("categories/{id}", [CategoriesController::class, "deleteCategory"]);

```

## La récupération des items sur le front

Pour le front, les components React composent la majorité de l'affichage (des vues). Dans un premier temps, on va récupérer via un fetch le résultat des routes dans un json. Puis on va utiliser la fonction map (équivalent du foreach) pour afficher toutes les données demandées. Dans le cas de la page d'accueil, on présentera tous les produits proposés triés par popularité (nombre de visites sur la page).

```js
const fetchUserData = () => {
fetch("http://127.0.0.1:8000/api/gozizi")
.then(response => {
return response.json()
})
.then(data => {
setArticles(data)
//On récupère, ici les articles, via le setter setArticles. Ensuite, on va boucler via map sur articles.
})
}

{articles.map((article) => (
//Et pour chaque entrée du json, on va insérer une ligne dans le tableau.
<TableRow key={article.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
	<TableCell component="th" scope="row">{article.name}</TableCell>
	<TableCell align="right">{article.category}</TableCell>
	<TableCell align="right">{article.sub_category}</TableCell>
	<TableCell align="right">
	{random()}/5
	</TableCell>

	<TableCell align-self="right">{isAvailable(article.stock)}</TableCell>
	<TableCell align="right">{article.price}€</TableCell>
</TableRow>

))}
```

## Les breadcrumbs (fil d'Arianne)

Dans le menu principal, on a aussi la possibilité de se repérer sur le site en utilisant des breadcrumbs. Ceux-ci vont montrer le chemin parcouru pour arriver à une certaine page ou un article. Par exemple, si on venait à arriver sur la page d'un clavier, les breadcrumbs ressembleraient à :
`Accueil > Périphériques > Claviers > "Le produit demandé"`

En JS, on récupère les breadcrumbs comme ceci : 

```js
const segments = props.navigation.pathname.split("/");
const dernierSegment = segments[segments.length - 1];
const premierSegment = segments[0] = "acceuil";

//On récupère le chemin de notre URL pour récupérer le premier et le dernier segment de notre chemin
const fil_ariane = segments.map((segment, index) => (

<div key={uuidv4()}>
	<Link style={{
	textDecoration: 'none',
	fontSize: '1.4em'
	}} to={ index > 0 ? segments.slice(1, index + 1).join('/') : ''}>
	{
segment !== premierSegment ? (
<span style={{
background: '#c9e4ff',
color: segment !== dernierSegment ? 'gray' : 'black',
}}
>
{segment.replace(/-/g, " ")}
</span>
) : (
<FontAwesomeIcon icon={faHouseUser} style={{ color: "grey"}} />
)}
</Link>
</div>
));

```
