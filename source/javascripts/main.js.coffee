#= require headroom

$ ->
  header = document.querySelector("header")
  headroom = new Headroom(header)
  headroom.init()
  return
