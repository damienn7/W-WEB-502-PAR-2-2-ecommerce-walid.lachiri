<!DOCTYPE html>
<html>
<head>
    <title>Facture</title>
</head>
<body>
<h2>Facture de commande</h2>
<h3>Cher {{ $username }},</h3>
<p>Voici le détail de votre commande :</p>

<table border="1">
    <thead>
        <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        @foreach($items as $item)
            <tr>
                <td>{{ $item->name }}</td>
                <td>{{ $item->quantite }}</td>
                <td>{{ $item->unit_price }}</td>
                <td>{{ $item->quantite * $item->unit_price }}</td>
            </tr>
        @endforeach
        <tr>
            <td colspan="3">Frais de livraison ({{ $country }})</td>
            <td>{{ $shipping_fee }}</td>

        </tr>
        <tr>
        <td colspan="3">Méthode de Livraison ({{ $shipping_method }})</td>
            <td>{{ $delivery_price }}</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Total à payer</td>
            <td>{{ $total + $shipping_fee+$delivery_price }} EUR</td>
        </tr>
    </tfoot>
</table>

<p>Merci d'avoir choisi notre service!</p>
</body>
</html>
