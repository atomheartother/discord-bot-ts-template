# Help messages
## General
### This is displayed when the bot is pinged
prefixUsage =
    {-b}Salut! Je suis {$botName}!{-b}
    Mon préfixe sur ce serveur est `{$prefix}`.
    Si tu ne sais pas par où commencer, tu peux envoyer: `{$prefix}help`.

### This is in the help message header
helpHeader = {$botName} - le futur super bot

### The main help message body, followed by usage
helpIntro =
    {-b}Salut, je suis {$botName}{-b}, je suis un bot générique à partir duquel un développeur peut créer un super bot.
    Voici quelques choses que vous pouvez faire:

## Usage strings
usage-announce =
    `{$prefix}announce <chaîne>`
    Modifier la chaîne que {$botName} utilise pour parler au staff.

usage-lang =
    `{$prefix}lang [langue]`
    Afficher la liste des langues disponibles, ou modifier la langue du serveur.

usage-setprefix =
    `{$prefix}setprefix [préfixe]`
    Modifier mon préfixe sur ce serveur.

# Errors
## Resolution errors
noSuchMember =
    {-b}Je n'ai pas trouvé de membre à partir de `{$member}` sur ce serveur.{-b}
    S'ils sont bien sur le serveur, vous pouvez utiliser `@membre` ou envoyer son ID!

noSuchChannel =
    {-b}Je n'ai pas trouvé de chaîne à partir de `{$name}`.{-b}*
    Peut-être que je ne peux pas voir cette chaîne, vérifiez vos permissions.

## Permission fails
isAdminPermFail =
    {-b}Tu n'es pas un.e admin!{-b}
    Tu dois être admin pour utiliser `{$prefix}{$command}`!

isServerModPermFail =
    {-b}Tu n'es pas modérateur.trice!{-b}
    Tu dois être mod pour utiliser `{$prefix}{$command}`!

manageRolesPermFail =
    {-b}Tu ne peux pas gérer les rôles utilisateur!{-b}
    Tu dois avoir le droit de modifier les droits utilisateur pour utiliser `{$prefix}{$command}`!

# Commands
## Announce
notTextChannel = 
    {-b}<{-h}{$channel}> n'est pas une chaîne texte!{-b}
    Je ne peux poster que sur les chaînes texte.

announceSuccess =
    {-b}Ma chaîne d'annonces a été changée!{-b}
    Je posterais maintenant mes messages dans <{-h}{$channel}>.

## Lang
noSuchLang = 
    {-b}{$language} n'est pas une langue valide!{-b}
    Utilise `{$prefix}lang` pour voir une liste des langues disponibles.

langSuccess =
    {-b}Langue modifiée avec succès!{-b}
    Je parlerais maintenant français :P

## Setprefix
setPrefixSuccess =
    {-b}Préfixe modifié avec succès!{-b}
    Tu peux maintenant utiliser `{$prefix}` pour exécuter mes commandes.

langHeader = {-b}Afficher/modifier la langue du serveur{-b}
langIntro = Uilise `{$prefix}lang <langue>` pour changer la langue du serveur.
i18nCredits = Français, par Liz <33