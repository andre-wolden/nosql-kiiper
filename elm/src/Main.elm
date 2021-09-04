port module Main exposing (Model, Msg(..), init, main, toJs, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Http exposing (Error(..))
import Json.Decode as Decode



-- ---------------------------
-- PORTS
-- ---------------------------


port toJs : String -> Cmd msg



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model = {}


init : Int -> ( Model, Cmd Msg )
init flags =
    ( { }, Cmd.none )



-- ---------------------------
-- UPDATE
-- ---------------------------


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        NoOp ->
            (model, Cmd.none
            )

-- ---------------------------
-- VIEW
-- ---------------------------


view : Model -> Html Msg
view model =
    div [
        ] [ text "Lets go kiiper"]



-- ---------------------------
-- MAIN
-- ---------------------------


main : Program Int Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view =
            \m ->
                { title = "kiiper with nosql tryout"
                , body = [ view m ]
                }
        , subscriptions = \_ -> Sub.none
        }
